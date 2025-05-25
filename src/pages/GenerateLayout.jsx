import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import ImageLog from "../components/layout/ImageLog";
import useImageLogs from "../hooks/useImageLogs";

const GenerateLayout = () => {
  const { logs, fetchLogs, removeLog } = useImageLogs();

  return (
    <main className="flex h-screen flex-col lg:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="bg-base-300 text-white lg:w-1/3 lg:overflow-y-auto">
          <Outlet context={{ onGenerate: fetchLogs }} />
        </div>
        <div className="bg-neutral border-l-2 border-gray-800 lg:w-2/3 lg:overflow-y-auto">
          <ImageLog logs={logs} onRefresh={fetchLogs} onDelete={removeLog} />
        </div>
      </div>
    </main>
  );
};

export default GenerateLayout;
