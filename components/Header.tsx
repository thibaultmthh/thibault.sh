import { IconMenu2 } from "@tabler/icons";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileMenu from "./MobileMenu";

const sections = ["Home", "About", "Projects", "Dashboard", "Guestbook", "Contact"];

export default function Header() {
  const router = useRouter();
  const { pathname } = router;
  const isActive = (path: string) => {
    console.log(pathname, path.toLocaleLowerCase(), pathname.includes(path.toLocaleLowerCase()));

    return pathname.includes(path.toLocaleLowerCase());
  };

  const destPath = (section: string) => (section === "Home" ? "/" : `/${section.toLocaleLowerCase()}`);
  return (
    <div className="mt-5">
      <MobileMenu />
      <div className="container justify-between rounded-lg max-w-lg mx-auto flex-row  bg-neutral-800  hidden sm:visible sm:flex mb-10">
        {sections.map((section) => (
          <Link href={destPath(section)} key={section}>
            <a
              className={cn(
                "  rounded-lg py-2 px-3 hover:bg-neutral-700 ",
                isActive(section) ? "text-violet-400" : "text-neutral-50"
              )}
            >
              {section}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
