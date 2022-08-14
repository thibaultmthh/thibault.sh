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
