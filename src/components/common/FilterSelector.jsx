const FilterSelector = ({ filter, setFilter, onSelect }) => {
  const filterOptions = [
    { value: "Disney", name: "디즈니", image: "/models/Disney.jpg" },
    { value: "Ghibli", name: "지브리", image: "/models/Ghibli.jpg" },
  ];

  const handleFilterChange = (value) => {
    setFilter(value);
    onSelect?.(value);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-md font-medium text-white">필터 선택</p>
      <div className="flex gap-4">
        {filterOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            className={`flex flex-1 cursor-pointer flex-col rounded-md border-2 border-transparent hover:border-2 hover:border-gray-500 ${
              filter === option.value ? "ring-success ring-4" : ""
            } `}
          >
            <img
              src={option.image}
              alt={option.name}
              className="h-32 w-full rounded-md object-cover"
            />
            <div className="bg-base-200 flex flex-1 items-center justify-center font-medium text-white">
              {option.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
