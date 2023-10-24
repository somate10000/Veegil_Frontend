import { useState } from "react";
import axios from "axios";

export const useTransfer = () => {
  const [transfererror, setError] = useState(null);
  const [data, setData] = useState("");
  const [transferisLoading, setIsLoading] = useState(null);

  const transfer = async (account, amount, bank) => {
    setIsLoading(true);
    setError(null);

    const data = { account, amount, bank };
    console.log("data recieved", data);

    try {
      const reponse = await axios
        .post("https://veegil-kjpc.onrender.com/api/transfer", data)
        .then((data) => {
          console.log(data.data.data);
          setData(data.data.data);
        });
      setIsLoading(false);

      console.log("reponse)");
    } catch (e) {
      setIsLoading(false);

      setError(e);
      console.log(e);
    }
  };

  return { transfer, transferisLoading, transfererror, data };
};

//http://localhost:4000/api/billCategories
