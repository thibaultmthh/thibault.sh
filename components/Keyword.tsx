export default function Keyword({
  keyword,
  strong,
  onClick,
}: {
  keyword: string;
  strong?: boolean;
  onClick?: (keyword: string) => void;
}) {
  if (strong) {
    return (
      <span
        className="rounded-lg text-xs text-red-200 bg-red-200 bg-opacity-50 p-1 px-2 m-1 first:ml-0"
        onClick={() => {
          if (onClick) {
            onClick(keyword);
          }
        }}
      >
        {keyword}
      </span>
    );
  }

  return (
    <span
      className="rounded-lg text-xs text-neutral-300 bg-red-500 p-1 px-2 m-1 first:ml-0"
      onClick={() => {
        if (onClick) {
          onClick(keyword);
        }
      }}
    >
      {keyword}
    </span>
  );
}
