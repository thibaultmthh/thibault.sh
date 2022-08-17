export default function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-32">
      <h1 className="font-bold text-5xl text-white">{title}</h1>
      <h2 className="text-base mt-1 text-neutral-300">{description}</h2>
    </div>
  );
}
