import { useState, useEffect, useCallback } from "react";
import { fetchImageLogs } from "../services/api";
import { deleteImageLog } from "../services/api";

const useImageLogs = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetchImageLogs();
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const removeLog = useCallback(
    async (id) => {
      try {
        await deleteImageLog(id);
        await fetchLogs();
      } catch (err) {
        console.error(err);
      }
    },
    [fetchLogs],
  );

  return { logs, fetchLogs, removeLog };
};

export default useImageLogs;
