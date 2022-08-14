import { IconMenu2 } from "@tabler/icons";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const sections = ["Home", "About", "Projects", "Dashboard", "Guestbook", "Contact"];

export default function Header() {
  return (
    <div className="mt-5">
      <MobileMenu />
      <div className="container justify-between rounded-lg max-w-lg mx-auto flex-row  bg-neutral-800  hidden sm:visible sm:flex mb-10">
        {sections.map((section) => (
          <Link href={`/${section.toLocaleLowerCase()}`} key={section}>
            <a className=" text-neutral-50 rounded-lg py-2 px-3 hover:bg-neutral-700 ">{section}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
