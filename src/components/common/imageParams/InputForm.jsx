const InputForm = ({ prompt, setPrompt }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="prompt-input">텍스트 입력</label>
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
