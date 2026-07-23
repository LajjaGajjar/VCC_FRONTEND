import "../../styles/main.css";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  disabled = false
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="input"
    />
  );
}
