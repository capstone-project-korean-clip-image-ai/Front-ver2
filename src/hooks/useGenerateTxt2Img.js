import { useState } from "react";
import { generateTxt2Img } from "../services/api";

const useGenerateTxt2Img = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await generateTxt2Img(params);
      const items = res.data.results || [];
      setUrls(items.map((item) => item.url));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { urls, loading, error, generate };
};

export default useGenerateTxt2Img;
