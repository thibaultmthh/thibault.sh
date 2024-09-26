export default function Parakeet() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Parakeet is a Twitter giveaway bot.</h2>
      <p>
        It&apos;s an app that allows you to manage hundreds of Twitter accounts and enter twitter giveaways with them.
      </p>
      <a href="https://discord.gg/RvYDTWf5Uy" className="text-orange-500 hover:text-orange-600 transition-colors">
        Join the Discord server
      </a>
      <a href="https://whop.com/parakeet-io" className="text-orange-500 hover:text-orange-600 transition-colors">
        Buy a license
      </a>
      <h3 className="text-lg font-bold">Video demo</h3>
      <video src="/parakeet/Parakeet_IO_Promo_Video.mp4" className="w-full" controls />
    </div>
  );
}
