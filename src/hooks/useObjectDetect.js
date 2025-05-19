import { useState } from "react";
import { objectDetect } from "../services/api";

const useObjectDetect = () => {
  const [masks, setMasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detect = async (file, coords) => {
    if (!file || !coords) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("x", coords.x);
      form.append("y", coords.y);

      const res = await objectDetect(form);
      const items = res.data.results || [];
      setMasks(items.map((i) => i.url));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { masks, loading, error, detect };
};

export default useObjectDetect;
