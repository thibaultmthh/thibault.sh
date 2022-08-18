import { IconMenu2 } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import style from "styles/MobileMenu.module.scss";

const sections = ["Home", "About", "Projects", "Dashboard", "Guestbook", "Contact"];

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const destPath = (section: string) => (section === "Home" ? "/" : `/${section.toLocaleLowerCase()}`);

  return (
    <div className="visible flex flex-col sm:hidden">
      <a
        onClick={() => {
          console.log("menu open");
          setMenuOpen(!menuOpen);
        }}
        className="ml-2 "
      >
        <IconMenu2 color="white" size={40} className="ml-2" />
      </a>
      <ul className={cn(style.menu, menuOpen && style.menuopen, "absolute top-16 w-full h-full bg-neutral-900")}>
        {sections.map((section, i) => (
          <li
            className={" py-5 ml-3 mr-40  border-b  border-neutral-400"}
            style={{
              transitionDelay: `${(menuOpen ? sections.length : 0) - i * 50 + 200}ms`,
            }}
            key={section}
          >
            <Link href={destPath(section)} key={section}>
              <a className="text-neutral-50 ">{section}</a>
            </Link>
          </li>
        ))}
      </ul>
      )
    </div>
  );
}
