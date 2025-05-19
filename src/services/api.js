import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/",
});

// Txt2Img
export const generateTxt2Img = (params) => api.post("/txt2img", params);

// Inpaint SAM detect
export const objectDetect = (formData) =>
  api.post("/inpaint/object_detect", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Inpaint erase
export const eraseObject = (formData) =>
  api.post("/inpaint/erase_object", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Inpaint redraw
export const redrawObject = (formData) =>
  api.post("/inpaint/redraw_object", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Img2Img edge
export const generateImg2ImgEdge = (formData) =>
  api.post("/img2img/edge", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Img2Img pose
export const generateImg2ImgPose = (formData) =>
  api.post("/img2img/pose", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// get all images
export const fetchImageLogs = () => api.get("/logs");

// delete image by id
export const deleteImageLog = (id) => api.delete(`/logs/${id}`);
