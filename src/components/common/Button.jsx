import "../../styles/main.css";

export default function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variant} ${disabled ? "disabled" : ""}`}
    >
      {text}
    </button>
  );
}
