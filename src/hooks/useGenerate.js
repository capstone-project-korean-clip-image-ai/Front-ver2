import { useState } from "react";
import { generateTxt2Img } from "../services/api";
import { generateImg2ImgEdge } from "../services/api";
import { generateImg2ImgPose } from "../services/api";
import { generateImg2ImgStyle } from "../services/api";
import { generateImg2ImgStrain } from "../services/api";

const useGenerate = () => {
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

  const modify = async (params, img2imgMode, uploadimage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(uploadimage);
      if (!response.ok) {
        throw new Error(
          `Blob URL로부터 이미지를 가져오는 데 실패했습니다: ${response.statusText}`,
        );
      }
      const imageBlob = await response.blob();

      const form = new FormData();
      form.append("data", JSON.stringify(params));
      form.append("image", imageBlob);
      let res;

      if (img2imgMode === "edge") {
        res = await generateImg2ImgEdge(form);
      } else if (img2imgMode === "pose") {
        res = await generateImg2ImgPose(form);
      } else if (img2imgMode === "style") {
        res = await generateImg2ImgStyle(form);
      } else {
        throw new Error(`Invalid img2imgMode: ${img2imgMode}`);
      }

      const items = res.data.results || [];
      setUrls(items.map((item) => item.url));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const strain = async (filter, imgNum, uploadimage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(uploadimage);
      if (!response.ok) {
        throw new Error(
          `Blob URL로부터 이미지를 가져오는 데 실패했습니다: ${response.statusText}`,
        );
      }
      const imageBlob = await response.blob();
      const form = new FormData();
      form.append("filter", filter);
      form.append("imgNum", imgNum);
      form.append("image", imageBlob);

      let res;

      res = await generateImg2ImgStrain(form);

      const items = res.data.results || [];
      setUrls(items.map((item) => item.url));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { urls, loading, error, generate, modify, strain };
};
export default useGenerate;
