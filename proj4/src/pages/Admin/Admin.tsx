import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";

const Admin = () => {
  const userID = useAppSelector((state) => state.user.id);
  //   to update
  const token = useAppSelector((state) => state.user.token.access);

  const [data, setData] = useState<{
    revenue: number;
    cost: number;
    gross_profit: number;
    gpm: number;
    sorted_quantity: [];
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

  return (
    <div>
      Revenue: {data.revenue}
      Cost: {data.cost}
      Gross Profit: {data.gross_profit}
      GPM {data.gpm}
      Top sales:{" "}
      {data.sorted_quantity.map((item) => {
        return (
          <>
            {item[0]} {item[1]}
          </>
        );
      })}
    </div>
  );
};

export default Admin;
