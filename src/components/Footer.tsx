import Link from "next/link";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ icon, href, label }) => (
  <a href={href} aria-label={label} className="text-orange-500 hover:text-orange-600 transition-colors">
    {icon}
  </a>
);

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-gray-500">
      <div className="flex justify-center space-x-4 sm:space-x-6 mb-2 sm:mb-4">
        <SocialLink icon={<GitHubLogoIcon />} href="https://github.com/thibaultmthh" label="My github link" />
        <SocialLink
          icon={<LinkedInLogoIcon />}
          href="https://www.linkedin.com/in/thibault-mathian/"
          label="My Linkedin link"
        />
        <SocialLink icon={<TwitterLogoIcon />} href="https://twitter.com/thibault_mthh" label="My Twitter (X) link" />
      </div>
      <nav className="mb-4">
        <Link href="/" className="text-sm text-orange-500 hover:text-orange-600 mx-2">
          Home
        </Link>
        <Link href="/blog" className="text-sm text-orange-500 hover:text-orange-600 mx-2">
          Blog
        </Link>
        <Link href="/tools" className="text-sm text-orange-500 hover:text-orange-600 mx-2">
          Tools
        </Link>
        <Link href="/site-map" className="text-sm text-orange-500 hover:text-orange-600 mx-2">
          Sitemap
        </Link>
        <Link href="/contact" className="text-sm text-orange-500 hover:text-orange-600 mx-2">
          Contact
        </Link>
      </nav>
      <p className="text-sm sm:text-base text-zinc-600">Made with ❤️ by Thibault Mathian</p>
    </footer>
  );
}
