const InputForm = ({ prompt, setPrompt }) => {
  return (
    <div className="flex flex-col">
      <textarea
        className="textarea w-full"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="파란머리의 소녀"
      />
    </div>
  );
};

export default InputForm;
