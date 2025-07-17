const ImageLog = ({ logs, onRefresh, onDelete }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex justify-between border-b-2 border-gray-800">
        <div className="flex items-center p-4 text-xl font-bold">
          생성된 이미지
        </div>
        <div className="flex items-center px-4 py-0 text-sm text-gray-500">
          <button
            onClick={onRefresh}
            className="btn btn-square btn-outline h-8 w-8 rounded-lg"
            title="새로고침"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 1024 1024"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M643.759 876.884c77.46-26.672 141.075-75.755 185.988-137.307a19.72 19.72 0 005.693-17.36 19.44 19.44 0 00-.088-.589l-.01-.049a19.667 19.667 0 00-10.709-14.159l-56.53-40.088a19.77 19.77 0 00-17.265-5.427c-.155.02-.31.042-.464.066l-.072.019a19.825 19.825 0 00-14.149 10.532c-31.44 42.857-75.609 76.947-129.836 95.619-140.801 48.482-293.643-25.746-341.963-166.079s26.422-292.924 167.222-341.406c131.991-45.448 273.616 14.979 330.786 138.05l-89.429.558c-8.995-1.174-17.65 3.91-20.99 12.331a19.656 19.656 0 006.332 23.117l153.694 155.17c3.812 3.848 9.047 5.96 14.475 5.84s10.574-2.461 14.228-6.475l148.171-162.749c6.482-5.349 8.872-14.193 5.961-22.048-.05-.132-.102-.264-.156-.394a19.374 19.374 0 00-1.228-2.599l-.04-.09c-4.015-7.084-11.99-10.968-20.072-9.775l-89.491.945-1.173-3.406c-68.86-199.985-287.86-306.346-488.523-237.252S86.366 439.616 155.226 639.601c68.86 199.985 287.86 306.345 488.523 237.251l.011.033z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-end"></div>
      {logs.length === 0 ? (
        <p className="text-gray-400">아직 생성된 이미지가 없습니다.</p>
      ) : (
        <div className="space-y-6 overflow-y-auto p-4">
          {logs.map((log) => (
            <div key={log.id} className="relative snap-start p-4">
              <div className="flex flex-col justify-between gap-2">
                <button
                  onClick={() => onDelete(log.id)}
                  className="btn btn-square btn-error btn-outline absolute top-4 right-4 h-8 w-8 rounded-lg text-xl font-bold text-red-500 hover:text-red-700"
                  title="로그 삭제"
                >
                  ✕
                </button>
                <div className="absolute right-4 bottom-4 text-sm text-gray-500">
                  <div>{new Date(log.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-row justify-start gap-4 font-bold">
                  <div className="badge badge-primary badge-outline text-md flex flex-row">
                    {(log.type === "img2img" || log.type === "inpainting") && (
                      <div className="group relative z-50 mr-1 flex items-center overflow-visible">
                        {/* 작은 썸네일 */}
                        <img
                          src={log.originalImage}
                          alt="원본 이미지"
                          className="h-6 w-6 rounded-full ring ring-primary object-cover"
                        />
                        {/* hover 시 확장된 이미지 */}
                        <img
                          src={log.originalImage}
                          alt="확대된 원본 이미지"
                          className="border-base-100 absolute top-full left-full z-50 mt-2 ml-2 hidden max-h-48 w-auto max-w-48 transform rounded-md border-4 object-contain shadow-lg group-hover:block"
                        />
                      </div>
                    )}
                    {log.type && <div className="uppercase">{log.type}</div>}
                    {log.subType && (
                      <div className="capitalize"> - {log.subType}</div>
                    )}
                  </div>
                  {log.model && (
                    <div className="badge badge-outline badge-info">
                      {log.model}
                    </div>
                  )}
                  {log.loras.length > 0 && (
                    <div className="badge badge-outline badge-warning capitalize">
                      {log.loras.join(", ")}
                    </div>
                  )}
                </div>
                <div className="flex h-full flex-row justify-start py-2 text-2xl font-bold text-white">
                  {log.prompt && <div className="">{log.prompt}</div>}
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 pb-6 md:grid-cols-4">
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
