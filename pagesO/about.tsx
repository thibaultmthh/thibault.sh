import Contener from "components/Contener";
import PageTitle from "components/PageTitle";
import Link from "next/link";

const NetworkLinks = ({ href, title, slug }: { href: string; title: string; slug: string }) => (
  <li className="text-white">
    {title} :{" "}
    <Link href={href}>
      <a className="text-violet-400">@{slug}</a>
    </Link>
  </li>
);

export default function About() {
  return (
    <Contener title="About - Thibault Mathian" description="About me. Where to find me and contact me.">
      <PageTitle title="About" description="" />
      <div className="mb-16">
        <h1 className="font-bold text-2xl text-white ">Links</h1>
        <ul>
          <NetworkLinks href="https://www.linkedin.com/in/thibault-mathian/" title="LinkedIn" slug="thibault-mathian" />
          <NetworkLinks href="https://github.com/thibaultmthh" title="Github" slug="thibaultmthh" />
          <NetworkLinks href="https://twitter.com/0xthibaulteth" title="Twitter" slug="0xthibaulteth" />
          <NetworkLinks href="https://fiverr.com/thibaultmath" title="Fiverr" slug="thibaultmath" />
          <NetworkLinks href="https://www.malt.fr/profile/thibault" title="Malt" slug="thibault" />
          <NetworkLinks
            href="https://stackoverflow.com/users/13179988/thibault-mthh"
            title="Stackoverflow"
            slug="thibaultmthh"
          />
        </ul>
      </div>
      <div className="mb-16">
        <h1 className="font-bold text-2xl text-white ">About</h1>
        <p className="text-base text-neutral-300">
          I am a fullstack developper living in Grenoble. (France) I love to code and I love to create. I am a
          self-taught developer and I am always looking for new challenges. <br />
        </p>
      </div>
    </Contener>
  );
}
