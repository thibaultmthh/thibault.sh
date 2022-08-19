import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-4">
      <div className=" flex flex-col justify-between px-10 sm:flex-row">
        <div className="flex flex-col my-2">
          <Link href="/" className="my-4">
            <a className="my-1">Home</a>
          </Link>{" "}
          <Link href="/about">
            <a className="my-1">About</a>
          </Link>
          <Link href="/contact">
            <a className="my-1">Contact</a>
          </Link>
        </div>
        <div className="flex flex-col my-2">
          <Link href="/projects" className="my-4">
            <a className="my-1">Project</a>
          </Link>
          <Link href="/dashboard">
            <a className="my-1">Dashboard</a>
          </Link>
          <Link href="/guestbook">
            <a className="my-1">Guestbook</a>
          </Link>
        </div>
        <div className="flex flex-col my-2">
          <Link href="https://www.malt.fr/profile/thibault" className="my-4">
            <a className="my-1">Malt</a>
          </Link>
          <Link href="https://github.com/thibaultmthh?tab=repositories">
            <a className="my-1">Github</a>
          </Link>
          <Link href="https://www.linkedin.com/in/thibault-mathian/">
            <a className="my-1">Linkedin</a>
          </Link>
        </div>
        <div className="flex flex-col my-2">
          <Link href="/" className="my-4">
            <a className="my-1">Home</a>
          </Link>
          <Link href="/about">
            <a className="my-1">About</a>
          </Link>
          <Link href="/contact">
            <a className="my-1">Contact</a>
          </Link>
        </div>
      </div>

      <div>
        <p className="text-base text-neutral-300 text-center my-8">Made with ❤️ by Thibault - 2022</p>
      </div>
    </footer>
  );
}
