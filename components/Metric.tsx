import { useQuery } from "@tanstack/react-query";

export default function Metric({
  name,
  description,
  fetcher,
}: {
  name: string;
  description: string;
  fetcher: () => void;
}) {
  const { isLoading, isError, data } = useQuery([name], fetcher);

  const value = isLoading ? "..." : isError ? "Error" : data;

  return (
    <div className="  p-5 border border-violet-600 rounded-md w-full shadow-none  hover:shadow-md hover:shadow-violet-500 ">
      <h2 className="text-base text-right mt-1 text-neutral-300 mr-4">{description}</h2>
      <p className="text-white text-3xl font-medium">{value ? "" : ""}</p>
    </div>
  );
}
