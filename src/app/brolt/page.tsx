export default function Brolt() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">
        Brolt is a bot developed for Instagram, designed to participate in giveaways using multiple accounts.
      </h2>
      <p>Brolt is an app that allows you to manage multiple Instagram accounts and enter giveaways with them.</p>

      <a
        href="https://docs.google.com/presentation/d/1fy5UaPWdTrYMqNZfk89c2aEV4tSeyx3EhGPslhb1tc4/edit?usp=sharing"
        className="text-orange-500 hover:text-orange-600 transition-colors"
      >
        View the presentation (docs)
      </a>
      <p>It is now opensource and available on Github.</p>
      <a
        href="https://github.com/thibaultmthh/BROLT-IG-BOT"
        className="text-orange-500 hover:text-orange-600 transition-colors"
      >
        View the code
      </a>
    </div>
  );
}
