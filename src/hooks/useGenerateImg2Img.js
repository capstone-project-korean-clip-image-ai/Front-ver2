import { useState } from "react";
import { generateImg2ImgEdge } from "../services/api";
import { generateImg2ImgPose } from "../services/api";

const useGenerateImg2Img = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async (params, img2imgMode, uploadimage) => {
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("data", JSON.stringify(params));
      form.append("image", uploadimage);
      let res;

      if (img2imgMode === "edge") {
        res = await generateImg2ImgEdge(form);
      } else if (img2imgMode === "pose") {
        res = await generateImg2ImgPose(form);
      }
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
export default useGenerateImg2Img;
