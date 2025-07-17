import { useState } from "react";
import { objectDetect } from "../services/api";
import { eraseObject, redrawObject } from "../services/api";

const useInpaint = () => {
  const [masks, setMasks] = useState([]);
  const [urls, setUrls] = useState([]);
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
      // 다중 LoRA 전달
      form.append("data", JSON.stringify({ ...params, loras: params.loras }));
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

  return { masks, loading, detect, erase, redraw, urls, error };
};

export default useInpaint;
