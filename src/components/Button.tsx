interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, icon, href, onClick, variant = "primary" }) => {
  const baseClassName = "group flex items-center gap-3 transition-colors text-sm";

  const variantClassNames = {
    primary: "text-gray-700 hover:text-orange-500",
    secondary: "text-gray-500 hover:text-orange-500",
  };

  const className = `${baseClassName} ${variantClassNames[variant]}`;

  const content = (
    <>
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span className="font-mono">{children}</span>
      <span className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all -ml-2">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export default Button;
