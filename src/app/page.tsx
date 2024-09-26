"use client";
import {
  GlobeIcon,
  FileTextIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  CubeIcon,
} from "@radix-ui/react-icons";
import { useRef, useState } from "react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#9775412c_1px,transparent_1px),linear-gradient(to_bottom,#9775412c_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-orange-600">Thibault Mathian</h1>
          <p className="text-xl sm:text-2xl text-orange-500">Freelance Fullstack developper 🧑‍💻</p>
          <div className="flex justify-center mt-4 sm:mt-5 space-x-4">
            <SocialLink icon={<TwitterLogoIcon />} href="https://twitter.com/thibault_mthh" />
            <SocialLink icon={<LinkedInLogoIcon />} href="https://www.linkedin.com/in/thibault-mathian/" />
            <SocialLink icon={<GitHubLogoIcon />} href="https://github.com/thibaultmthh" />
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <CardSpotlight
            title="Kboom"
            year="2023-2024"
            status="In Progress"
            link="https://app.kboom.gg/"
            description="Kboom is a platform that help Esport club generate engagnement and fideltiy with their fans"
            type="client"
            projectType="app"
          />
          <CardSpotlight
            title="Tornado.fun"
            year="2024"
            status="Finished"
            link="https://tornado.fun"
            description="Tornado.fun is an app that allows you to create crypto tokens on the Blast blockchain."
            type="client"
            projectType="app"
          />
          <CardSpotlight
            title="SOS-passeport"
            year="2023"
            status="Discontinued"
            link="https://sos-passeport.fr"
            description="Sos-passeport is a website that references all mairies and their availabilities for passport creation appointments"
            type="personal"
            projectType="website"
          />
          <CardSpotlight
            title="Swift tech"
            year="2022"
            status="Discontinued"
            link="/swift-tech"
            //
            description="Swifttech was a desktop app that enabled you to mint nfts faster than conventional methods."
            type="personal"
            projectType="app"
          />
          <CardSpotlight
            title="Peoplesphere"
            year="2022-2023"
            status="Discontinued"
            link="https://peoplespheres.com/fr/"
            description="Peoplesphere is a startup that centralize HR data in France."
            type="client"
            projectType="app"
          />
          <CardSpotlight
            title="Choicyful"
            year="2023"
            status="Discontinued"
            link="https://apps.shopify.com/choicyful-1"
            description="A Shopify app enables merchants to customize product variant swatches."
            type="client"
            projectType="app"
          />
          <CardSpotlight
            title="Minting Bot"
            year="2022"
            status="Discontinued"
            link="https://github.com/thibaultmthh/parakeet-minter-cli"
            description="An Ethereum-based minting bot, designed for NFT releases with optimized gas management."
            type="personal"
            projectType="app"
          />
          <CardSpotlight
            title="Portfolio V1"
            year="2021-2022"
            status="Finished"
            link="https://v1.thibault.sh"
            description="Portfolio inspired by Lee Robinson Portfolio"
            type="personal"
            projectType="website"
          />
          <CardSpotlight
            title="Parakeet"
            year="2020-2023"
            status="Finished"
            link="https://parakeet.fr"
            description="Parakeet is a Twitter giveaway bot. It's an app that allows you to manage hundreds of Twitter accounts and enter twitter giveaways with them."
            type="personal"
            projectType="app"
          />
          <CardSpotlight
            title="Brolt"
            year="2020"
            status="Discontinued"
            link="https://github.com/thibaultmthh/BROLT-IG-BOT"
            description="Brolt is a bot developed for Instagram, designed to participate in giveaways using multiple accounts."
            type="personal"
            projectType="app"
          />
          <CardSpotlight
            title="Brolt"
            year="2019"
            status="Discontinued"
            link="https://x.com/SeigRobotics"
            description="Seig Robotics was a deskop app to manage multiple twitter profiles and enter twitter giveaways."
            type="client"
            projectType="app"
          />
        </main>

        <footer className="mt-16 sm:mt-20 text-center">
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 sm:mb-6">
            <SocialLink icon={<GitHubLogoIcon />} href="#" />
            <SocialLink icon={<LinkedInLogoIcon />} href="#" />
            <SocialLink icon={<TwitterLogoIcon />} href="#" />
          </div>
          <p className="text-sm sm:text-base text-gray-600">© 2023 Your Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

interface CardSpotlightProps {
  title: string;
  year: string;
  status: "In Progress" | "Finished" | "Discontinued";
  link: string;
  description: string;
  type: "personal" | "client";
  projectType: "website" | "app" | "other";
}

const ProjectIcon: React.FC<{ projectType: CardSpotlightProps["projectType"] }> = ({ projectType }) => {
  console.log({ projectType });

  switch (projectType) {
    case "website":
      return <GlobeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mr-2" />;
    case "app":
      return <CubeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mr-2" />;
    default:
      return <FileTextIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mr-2" />;
  }
};

const CardSpotlight: React.FC<CardSpotlightProps> = ({ title, year, status, link, description, type, projectType }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const statusColors = {
    "In Progress": "bg-blue-500",
    Finished: "bg-green-500",
    Discontinued: "bg-red-500",
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-orange-200 bg-white p-6 sm:p-8 shadow-lg flex flex-col h-full`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,166,0,.1), transparent 40%)`,
        }}
      />
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <ProjectIcon projectType={projectType} />
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              type === "client" ? "bg-orange-200 text-orange-800" : "bg-gray-200 text-gray-800"
            }`}
          >
            {type === "client" ? "Client" : "Personal"}
          </span>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <h3 className="mb-2 text-lg sm:text-xl font-semibold text-orange-600">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 mt-auto">
        <span className="text-xs text-gray-500">{year}</span>
        <Button icon={<FileTextIcon />} href={link}>
          View Project
        </Button>
      </div>
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, href }) => (
  <a
    href={href}
    className="group h-10 select-none rounded-[4px] bg-orange-600 px-4 leading-10 text-white shadow-[0_-1px_0_1px_#9a3412_inset,0_0_0_1px_#ea580c_inset,0_0.5px_0_1.5px_#fdba74_inset] hover:bg-orange-700 active:bg-orange-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset] inline-block"
  >
    <span className="flex items-center justify-center space-x-2 group-active:[transform:translate3d(0,1px,0)]">
      {icon && <span className="text-orange-100 group-hover:text-white">{icon}</span>}
      <span>{children}</span>
    </span>
  </a>
);

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => (
  <a href={href} className="text-orange-500 hover:text-orange-600 transition-colors">
    {icon}
  </a>
);
