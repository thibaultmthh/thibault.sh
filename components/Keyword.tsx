export default function Keyword({ keyword, strong }: { keyword: string; strong?: boolean }) {
  if (strong) {
    return (
      <span className="rounded-lg text-xs text-red-200 bg-red-200 bg-opacity-50 p-1 px-2 m-1 first:ml-0">
        {keyword}
      </span>
    );
  }
  return <span className="rounded-lg text-xs text-neutral-300 bg-red-500 p-1 px-2 m-1 first:ml-0">{keyword}</span>;
}
