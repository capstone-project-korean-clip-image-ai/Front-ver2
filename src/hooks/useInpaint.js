import { useState } from "react";
import { eraseObject, redrawObject } from "../services/api";

const useInpaint = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const erase = async (imageFile, maskBlob) => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("object", maskBlob);

      const res = await eraseObject(form);
      const items = res.data.results || [];
      setUrls(items.map((i) => i.url));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const redraw = async (params, imageFile, maskBlob) => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("data", JSON.stringify(params));
      form.append("image", imageFile);
      form.append("mask", maskBlob);

      const res = await redrawObject(form);
      const items = res.data.results || [];
      setUrls(items.map((i) => i.url));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { urls, loading, error, erase, redraw };
};

export default useInpaint;
