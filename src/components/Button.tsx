interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, href, onClick }) => {
  const className =
    "group h-10 select-none rounded-[4px] bg-orange-600 px-4 leading-10 text-white shadow-[0_-1px_0_1px_#9a3412_inset,0_0_0_1px_#ea580c_inset,0_0.5px_0_1.5px_#fdba74_inset] hover:bg-orange-700 active:bg-orange-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset] inline-block";

  const content = (
    <span className="flex items-center justify-center space-x-2 group-active:[transform:translate3d(0,1px,0)]">
      {icon && <span className="text-orange-100 group-hover:text-white">{icon}</span>}
      <span>{children}</span>
    </span>
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
