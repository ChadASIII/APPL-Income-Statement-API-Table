import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

const IncomeStatement = () => {
  const fetchStatement = async (): Promise<any> => {
    const res = await Axios.get(
      "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=YOURKEYHERE"
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["incomeStatement"],
    queryFn: fetchStatement,
  });
};

export default IncomeStatement;
