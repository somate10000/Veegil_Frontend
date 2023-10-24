import { useState } from "react";
import axios from "axios";

export const useGetAllBanks = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [benfName, setBenfName] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  console.log("loading");

  const endpoint = async () => {
    setIsLoading(true);
    setError(null);

    console.log("loading getting banks");

    try {
      await axios
        .get("https://veegil-kjpc.onrender.com/api/getallBanks")
        .then((data) => {
          setData(data.data.data);
          console.log(data.data.data);
        });
      setIsLoading(false);
      console.log("reponse)");
    } catch (e) {
      setIsLoading(false);
      setError(e);
      console.log("ERROR", e);
    }
  };

  const nuban = async (bankId, benfAcc) => {
    //setIsLoading(true);
    setError(null);

    console.log("loading1");
    const data = { bankId, benfAcc };
    console.log(data);
    console.log(benfAcc);
    const token = "sk_test_629a0accda2d66d205ce033f885e277e3fb22c6b";
    try {
      const reponse = await axios
        .get(
          `https://api.paystack.co:443/bank/resolve?account_number=${benfAcc}&bank_code=${bankId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          setBenfName(data.data.data.account_name);
          console.log(data.data.data.account_name);
        });
      // setIsLoading(false);
      console.log("reponse)");
    } catch (e) {
      //  setIsLoading(false);
      setError(e);
      console.log("ERROR", e);
    }
  };
  return { endpoint, nuban, isLoading, error, data, benfName };
};

//http://localhost:4000/api/billCategories
