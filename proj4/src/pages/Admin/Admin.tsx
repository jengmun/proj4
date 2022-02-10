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
  Cell,
  TooltipProps,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { CardContent, Card, CardMedia, Typography } from "@mui/material";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Box } from "@mui/system";

const Admin = () => {
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
      .get(`http://localhost:8000/order/analytics/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
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

  const RevenueTooltip = ({
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
          <label>{`${payload?.[0].name} : ${
            Math.round((Number(payload?.[0].value) / data?.revenue) * 10000) /
            100
          }%`}</label>
        </div>
      );
    }

    return null;
  };
  // exactly the same except for calculation
  const CostTooltip = ({
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
          <label>{`${payload?.[0].name} : ${
            Math.round((Number(payload?.[0].value) / data?.cost) * 10000) / 100
          }%`}</label>
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
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(3, min-content)",
        gridTemplateAreas: `"metrics metrics breakdown breakdown top" 
        "metrics metrics quantity quantity quantity" 
        "daily-sales daily-sales daily-sales product-metrics product-metrics"`,
        bgcolor: "#0f111e",
        p: 2,
        ml: "10%",
        minHeight: "100vh",
      }}
    >
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
            minWidth: "25%",
            height: "fit-content",
            backgroundImage: "linear-gradient(135deg, #db4ee3, #3022ae)",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            REVENUE:
          </Typography>
          <Typography
            variant="h3"
            sx={{ float: "right", color: "white", mt: 2 }}
          >
            ${data.revenue}
          </Typography>
        </Card>
        <Card
          sx={{
            p: 2,
            m: 2,
            minWidth: "25%",
            height: "fit-content",
            backgroundImage: "linear-gradient(135deg, #f16998, #f5cb75)",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            COST:
          </Typography>
          <Typography
            variant="h3"
            sx={{ float: "right", color: "white", mt: 2 }}
          >
            ${data.cost}
          </Typography>
        </Card>
        <Card
          sx={{
            p: 2,
            m: 2,
            minWidth: "25%",
            height: "fit-content",
            backgroundImage: "linear-gradient(135deg, #00e2bf, #02a5e9)",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            GROSS PROFIT:
          </Typography>
          <Typography
            variant="h3"
            sx={{ float: "right", color: "white", mt: 2 }}
          >
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
          <Typography variant="h6" sx={{ color: "white", mb: "2vh" }}>
            GROSS PROFIT MARGIN
          </Typography>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={metrics}
                innerRadius="80%"
                outerRadius="100%"
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
                    fontSize: "3vw",
                    fontFamily: "Roboto",
                  }}
                  value={`${data.gpm * 100}%`}
                  position="center"
                />
              </Pie>
              <Tooltip />
              {/* Define fill colours for all charts */}
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
          gridArea: "breakdown",
        }}
      >
        <Typography sx={{ pb: 1, color: "white" }}>
          Revenue and Cost Breakdown by Product
        </Typography>
        <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
          <ResponsiveContainer height={300} width="50%">
            <PieChart style={{ margin: "0 auto" }}>
              <Pie
                dataKey="revenue"
                data={data.sorted_quantity}
                cx="50%"
                cy="50%"
                outerRadius="70%"
                fill="url(#color1)"
              />
              <Tooltip content={<RevenueTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={300} width="50%">
            <PieChart style={{ margin: "0 auto" }}>
              <Pie
                dataKey="cost"
                data={data.sorted_quantity}
                cx="50%"
                cy="50%"
                outerRadius="70%"
                innerRadius="40%"
                fill="url(#color2)"
              />

              <Tooltip content={<CostTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <Typography
            sx={{ width: "50%", color: "white", textAlign: "center" }}
            variant="h6"
          >
            REVENUE
          </Typography>
          <Typography
            sx={{ width: "50%", color: "white", textAlign: "center" }}
            variant="h6"
          >
            COST
          </Typography>
        </CardContent>
      </Card>
      {/* 3. Quantity sold */}
      <Card
        sx={{
          p: 2,
          m: 2,
          bgcolor: "#1c1c1c",
          gridArea: "quantity",
        }}
      >
        <Typography sx={{ pb: 1, color: "white" }}>Quantity sold</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data.sorted_quantity}
            style={{ paddingTop: 2, margin: "0 auto" }}
          >
            <XAxis dataKey="name" style={{ fill: "url(#color2)" }} dy={10} />
            <YAxis style={{ fill: "white" }} />
            <Tooltip />
            <Bar dataKey="quantity" fill="url(#color1)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      {/* 4. Best selling product */}
      <Card
        sx={{
          p: 2,
          m: 2,
          gridArea: "top",
          bgcolor: "#1c1c1c",
          color: "white",
        }}
      >
        <Typography>
          Best Selling Product:
          <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
            {data.sorted_quantity[0]?.name}
          </Typography>
        </Typography>
        <CardMedia
          sx={{
            width: "auto",
            maxWidth: "90%",
            maxHeight: "210px",
            float: "right",
            mt: 2,
          }}
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
          height: "90%",
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
        sx={{
          gridArea: "product-metrics",
          p: 2,
          m: 2,
          bgcolor: "#1c1c1c",
          height: "90%",
        }}
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
