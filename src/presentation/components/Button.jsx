export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "secondary",
  className = "",
}) {
  let variantClass;
  switch (variant) {
    case "primary":
      variantClass = "btn-primary";
      break;
    case "add-to-cart":
      variantClass = "btn-add-to-cart";
      break;
    default:
      variantClass = "btn-secondary";
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass} ${className}`.trim()}>
      {children}
    </button>
  );
}