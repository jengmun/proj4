import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  Label,
  LineChart,
  Line,
  CartesianGrid,
  Cell,
  TooltipProps,
} from "recharts";
import { Card, Typography } from "@mui/material";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const Admin = () => {
  const userID = useAppSelector((state) => state.admin.id);
  const token = useAppSelector((state) => state.admin.token.access);

  const [data, setData] = useState<{
    revenue: number;
    cost: number;
    gross_profit: number;
    gpm: number;
    sorted_quantity: { name: string; quantity: number }[];
  }>({ revenue: 0, cost: 0, gross_profit: 0, gpm: 0, sorted_quantity: [] });

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/order/analytics/`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const metrics = [
    { name: "cost", value: data.cost },
    { name: "gross_profit", value: data.gross_profit },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload?.[0].name} : ${payload?.[0].value}%`}</label>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Card>
        <Typography>Revenue: </Typography>
        <Typography variant="h3">{data.revenue}</Typography>
      </Card>
      Gross Profit Margin
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={metrics}
          innerRadius={90}
          outerRadius={120}
          paddingAngle={5}
        >
          {metrics.map(
            (entry: { name: string; value: number }, index: number) => {
              if (index === 1) {
                return <Cell key={`cell-${index}`} fill="green" />;
              }
              return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
            }
          )}
          <Label value={`${data.gpm * 100}%`} position="center" />
        </Pie>
        <Tooltip />
      </PieChart>
      <BarChart width={500} height={300} data={data.sorted_quantity}>
        <XAxis dataKey="item" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="quantity" />
      </BarChart>
      Revenue and Cost Breakdown by Product
      <PieChart width={600} height={500}>
        <Pie
          dataKey="revenue"
          data={data.sorted_quantity}
          cx="25%"
          cy="50%"
          outerRadius={120}
          label
        />
        <Pie
          dataKey="cost"
          data={data.sorted_quantity}
          cx="75%"
          cy="50%"
          outerRadius={120}
          innerRadius={60}
          label
        />

        <Tooltip content={<CustomTooltip />} />
      </PieChart>
      <LineChart width={600} height={500} data={data.sorted_quantity}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <XAxis dataKey="item" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Line dataKey="gross_profit" yAxisId="left" type="monotone" />
        <Line dataKey="gpm" yAxisId="right" type="monotone" />
      </LineChart>
      Top Selling Product: {data.sorted_quantity[0]?.name}
    </div>
  );
};

export default Admin;
