const SelectOption = ({ options, selectedOptions, onClick }) => (
  <select multiple>
    {options.sort().map((option, index) => (
      <option value={option} key={index} selected={() => {}} onClick={onClick}>
        {option.split(",").slice(0, 6).join(", ")}
      </option>
    ))}
  </select>
);

export default SelectOption;
