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
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Card, CardMedia, Typography } from "@mui/material";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Box } from "@mui/system";

const Admin = () => {
  const userID = useAppSelector((state) => state.admin.id);
  const token = useAppSelector((state) => state.admin.token.access);

  const [data, setData] = useState<{
    revenue: number;
    cost: number;
    gross_profit: number;
    gpm: number;
    sorted_quantity: { name: string; quantity: number; image: string }[];
    orders: [];
  }>({
    revenue: 0,
    cost: 0,
    gross_profit: 0,
    gpm: 0,
    sorted_quantity: [],
    orders: [],
  });

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

  const legendText = (value: string) => {
    return <span style={{ color: "white" }}>{value}</span>;
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(3, min-content)",
        gridTemplateAreas: `"metrics metrics breakdown breakdown" 
        "metrics metrics quantity top" 
        "daily-sales daily-sales product-metrics product-metrics"`,
        bgcolor: "#0f111e",
        p: 2,
        ml: "200px",
      }}
    >
      {/* Define fill colours for charts */}
      <svg>
        <defs>
          <linearGradient
            id="color1"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor="#db4ee3" />
            <stop offset="1" stopColor="#3022ae" />
          </linearGradient>
          <linearGradient
            id="color2"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor="#f5cb75" />
            <stop offset="1" stopColor="#f16998" />
          </linearGradient>
          <linearGradient
            id="color3"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor="#02a5e9" />
            <stop offset="1" stopColor="#00e2bf" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Metrics */}

      <Card
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          m: 2,
          p: 2,
          gridArea: "metrics",
          bgcolor: "#1c1c1c",
        }}
      >
        <Card
          sx={{
            p: 2,
            m: 2,
            width: "25%",
            height: "fit-content",
            backgroundImage: "linear-gradient(135deg, #db4ee3, #3022ae)",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            REVENUE:
          </Typography>
          <Typography variant="h3" sx={{ float: "right", color: "white" }}>
            ${data.revenue}
          </Typography>
        </Card>
        <Card
          sx={{
            p: 2,
            m: 2,
            width: "25%",
            height: "fit-content",
            backgroundImage: "linear-gradient(135deg, #f16998, #f5cb75)",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            COST:
          </Typography>
          <Typography variant="h3" sx={{ float: "right", color: "white" }}>
            ${data.cost}
          </Typography>
        </Card>
        <Card
          sx={{
            p: 2,
            m: 2,
            width: "25%",
            height: "fit-content",
            backgroundImage: "linear-gradient(135deg, #00e2bf, #02a5e9)",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            GROSS PROFIT:
          </Typography>
          <Typography variant="h3" sx={{ float: "right", color: "white" }}>
            ${data.gross_profit}
          </Typography>
        </Card>

        <Card
          sx={{
            p: 2,
            m: 2,
            width: "90%",
            height: "fit-content",
            bgcolor: "#1c1c1c",
            boxShadow: "none",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            GROSS PROFIT MARGIN
          </Typography>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={metrics}
                innerRadius={100}
                outerRadius={140}
                paddingAngle={5}
              >
                {metrics.map(
                  (entry: { name: string; value: number }, index: number) => {
                    if (index === 1) {
                      return <Cell key={`cell-${index}`} fill="url(#color3)" />;
                    }
                    return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
                  }
                )}
                <Label
                  style={{
                    fill: "url(#color2)",
                    fontSize: "3rem",
                    fontFamily: "Roboto",
                  }}
                  value={`${data.gpm * 100}%`}
                  position="center"
                />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Card>
      {/* 2. Breakdown by Product */}
      <Card
        sx={{
          p: 2,
          m: 2,
          bgcolor: "#1c1c1c",
          height: "fit-content",
          gridArea: "breakdown",
        }}
      >
        <Typography sx={{ pb: 1, color: "white" }}>
          Revenue and Cost Breakdown by Product
        </Typography>
        <PieChart width={600} height={250} style={{ margin: "0 auto" }}>
          <Pie
            dataKey="revenue"
            data={data.sorted_quantity}
            cx="25%"
            cy="50%"
            outerRadius={115}
            label
            fill="url(#color1)"
          />

          <Pie
            dataKey="cost"
            data={data.sorted_quantity}
            cx="75%"
            cy="50%"
            outerRadius={115}
            innerRadius={60}
            label
            fill="url(#color2)"
          />

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </Card>
      {/* 3. Quantity sold */}
      <Card
        sx={{
          p: 2,
          m: 2,
          bgcolor: "#1c1c1c",
          height: "fit-content",
          gridArea: "quantity",
        }}
      >
        <Typography sx={{ pb: 1, color: "white" }}>Quantity sold</Typography>
        <BarChart
          width={300}
          height={250}
          data={data.sorted_quantity}
          style={{ paddingTop: 2, margin: "0 auto" }}
        >
          <XAxis dataKey="name" style={{ fill: "url(#color2)" }} dy={10} />
          <YAxis style={{ fill: "white" }} />
          <Tooltip />

          <Bar dataKey="quantity" fill="url(#color1)" />
        </BarChart>
      </Card>
      {/* 4. Best selling product */}
      <Card
        sx={{
          p: 2,
          m: 2,
          gridArea: "top",
          bgcolor: "#1c1c1c",
        }}
      >
        <Typography>
          Best Selling Product:
          <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
            {data.sorted_quantity[0]?.name}
          </Typography>
        </Typography>
        <CardMedia
          sx={{ width: "70%", height: "70%", float: "right" }}
          component="img"
          image={data.sorted_quantity[0]?.image}
        />
      </Card>
      {/* 5. Daily Sales */}
      <Card
        sx={{
          gridArea: "daily-sales",
          p: 2,
          m: 2,
          bgcolor: "#1c1c1c",
        }}
      >
        <Typography sx={{ mb: 2, color: "white" }}>Daily Sales ($)</Typography>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data.orders} style={{ margin: "0 auto" }}>
            <XAxis dataKey="date" tick={{ fill: "url(#color2)" }} dy={10} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />

            <Area
              dataKey="total"
              type="monotone"
              fill="url(#color2)"
              stroke="url(#color2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      {/* Product Metrics */}
      <Card
        sx={{ gridArea: "product-metrics", p: 2, m: 2, bgcolor: "#1c1c1c" }}
      >
        <Typography sx={{ mb: 2, color: "white" }}>Product Metrics</Typography>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data.sorted_quantity} style={{ margin: "0 auto" }}>
            <Tooltip />
            <Legend
              wrapperStyle={{ position: "relative", top: -15 }}
              formatter={legendText}
            />
            <XAxis dataKey="name" tick={{ fill: "url(#color2)" }} dy={10} />
            <YAxis yAxisId="left" tick={{ fill: "white" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "white" }}
            />
            <Line
              dataKey="gross_profit"
              yAxisId="left"
              type="monotone"
              stroke="url(#color1)"
              strokeWidth={4}
            />
            <Line
              dataKey="gpm"
              yAxisId="right"
              type="monotone"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
};

export default Admin;
