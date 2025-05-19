const ImageLog = ({ logs, onRefresh, onDelete }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-4 flex justify-end">
        <button
          onClick={onRefresh}
          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
        >
          로그 새로고침
        </button>
      </div>
      {logs.length === 0 ? (
        <p className="text-gray-400">아직 생성된 이미지가 없습니다.</p>
      ) : (
        <div className="space-y-6 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="relative rounded-lg border p-4">
              <button
                onClick={() => onDelete(log.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="로그 삭제"
              >
                ✕
              </button>
              <div className="text-sm text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </div>
              {log.id && <h3 className="font-medium">로그 ID : {log.id}</h3>}
              {log.prompt && (
                <h3 className="font-medium">Prompt : {log.prompt}</h3>
              )}
              {log.type && (
                <h3 className="font-medium">작업 방식 : {log.type}</h3>
              )}
              {log.subType && (
                <h3 className="font-medium">세부 내용 : {log.subType}</h3>
              )}
              {log.model && <h3 className="font-medium">모델 : {log.model}</h3>}
              {log.lora && <h3 className="font-medium">LoRA : {log.lora}</h3>}
              <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                {log.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt=""
                    className="w-full rounded object-cover shadow-sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLog;
