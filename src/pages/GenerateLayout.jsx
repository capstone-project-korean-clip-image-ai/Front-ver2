import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import ImageLog from "../components/layout/ImageLog";
import useImageLogs from "../hooks/useImageLogs";

const GenerateLayout = () => {
  const { logs, fetchLogs, removeLog } = useImageLogs();

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1">
        <div className="w-2/5 overflow-y-auto bg-gray-900 p-6 text-white">
          <Outlet context={{ onGenerate: fetchLogs }} />
        </div>
        <div className="bg-base-100 flex-1 overflow-y-auto border-l p-6">
          <ImageLog logs={logs} onRefresh={fetchLogs} onDelete={removeLog} />
        </div>
      </div>
    </main>
  );
};

export default GenerateLayout;
