const BadgeTextGradient = ({
  children,
  className,
  color,
  ...props
}: {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLSpanElement>["className"];
  color?: "green" | "yellow" | "red";
  props?: React.HTMLAttributes<HTMLSpanElement>;
}) => {
  let from = "from-[#8678f9]";
  if (color === "green") from = "from-[#00ff00]";
  if (color === "yellow") from = "from-[#ff9900]";
  if (color === "red") from = "from-[#ff0000]";

  return (
    <span
      className={
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-black px-3 py-1 text-sm font-medium text-slate-300 backdrop-blur-3xl opacity-70 " +
        className
      }
      {...props}
    >
      <span className={`bg-gradient-to-t ${from} to-[#fff] bg-clip-text text-transparent`}>{children}</span>
    </span>
  );
};

export default BadgeTextGradient;
