/* eslint-disable @next/next/no-img-element */
import CardSpotlight from "@/components/CardSpotLight";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Parakeet from "./parakeet/page";
import Brolt from "./brolt/page";
import Choicyful from "./choicyful/page";
import SwiftTech from "./swifttech/page";
import SosPassport from "./sos-passport/page";
import Button from "@/components/Button";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { BoxIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#9775412c_1px,transparent_1px),linear-gradient(to_bottom,#9775412c_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <header className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-orange-600">Thibault Mathian</h1>
          <p className="text-xl sm:text-2xl text-orange-500 mb-4">Freelance Fullstack developer 🧑‍💻</p>
          <div className="flex justify-center mt-4 sm:mt-5 space-x-4">
            <SocialLink icon={<TwitterLogoIcon className="size-6" />} href="https://twitter.com/thibault_mthh" />
            <SocialLink
              icon={<LinkedInLogoIcon className="size-6" />}
              href="https://www.linkedin.com/in/thibault-mathian/"
            />
            <SocialLink icon={<GitHubLogoIcon className="size-6" />} href="https://github.com/thibaultmthh" />
          </div>
          <div className="mt-6 flex flex-col gap-4 items-center">
            <Button href="mailto:dev@thibault.sh" icon={<EnvelopeClosedIcon />}>
              Contact Me
            </Button>
            <Button href="/tools" icon={<BoxIcon className="size-4" />} variant="secondary">
              Check out my Developer Tools
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <CardSpotlight
            title="Elevora"
            year="2024"
            status="In Progress"
            link="https://elevora.app"
            description="Elevora is a platform that allows businesses to create giveaways or waitlists where users can increase their rank or chance by inviting friends and completing tasks"
            type="personal"
            projectType="app"
          />
          <CardSpotlight
            title="Kboom"
            year="2023-2024"
            status="In Progress"
            link="https://app.kboom.gg/"
            description="Kboom is a platform that helps esports clubs generate engagement and loyalty with their fans."
            type="client"
            projectType="app"
            myImplication="Developed frontend with React/Next.js and contributed to Django backend."
          />
          <CardSpotlight
            title="Tornado.fun"
            year="2024"
            status="Finished"
            link="https://tornado.fun"
            description="Tornado.fun is an app that allows you to create crypto tokens on the Blast blockchain."
            type="client"
            projectType="app"
            myImplication="Built React frontend with Web3 integration, contributed to NestJS backend."
          />
          <CardSpotlight
            title="SOS-passeport"
            year="2023"
            status="Discontinued"
            // link="https://sos-passeport.fr"
            moreInfo={<SosPassport />}
            description="Sos-passeport is a website that references all mairies and their availabilities for passport creation appointments"
            type="personal"
            projectType="website"
          />
          <CardSpotlight
            title="Swift tech"
            year="2022"
            status="Discontinued"
            // link="/swift-tech"
            description="Swifttech was a desktop app that enabled you to mint nfts faster than conventional methods."
            type="personal"
            projectType="app"
            moreInfo={<SwiftTech />}
          />
          <CardSpotlight
            title="Peoplesphere"
            year="2022-2023"
            status="Discontinued"
            link="https://peoplespheres.com/fr/"
            description="Peoplesphere is a startup that centralizes HR data in France."
            type="client"
            projectType="app"
            myImplication="Developed MVP frontend with React, Redux, and Redux Saga. Conducted code reviews and unit testing."
          />
          <CardSpotlight
            title="Choicyful"
            year="2023"
            status="Discontinued"
            // link="https://apps.shopify.com/choicyful-1"
            description="A Shopify app enables merchants to customize product variant swatches."
            type="client"
            projectType="app"
            moreInfo={<Choicyful />}
            myImplication="Built full Shopify app with React frontend, Express backend, and Liquid theme extension."
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
            description="Parakeet is a Twitter giveaway bot. It's an app that allows you to manage hundreds of Twitter accounts and enter twitter giveaways with them."
            type="personal"
            projectType="app"
            moreInfo={<Parakeet />}
          />
          <CardSpotlight
            title="Brolt"
            year="2020"
            status="Discontinued"
            description="Brolt is a bot developed for Instagram, designed to participate in giveaways using multiple accounts."
            type="personal"
            projectType="app"
            moreInfo={<Brolt />}
          />
          <CardSpotlight
            title="Seig Robotics"
            year="2019"
            status="Discontinued"
            link="https://x.com/SeigRobotics"
            description="Seig Robotics was a desktop app to manage multiple Twitter profiles and enter Twitter giveaways."
            type="client"
            projectType="app"
            myImplication="Created MVP with Python/Flask, built Electron desktop app, and implemented Shopify licensing."
          />
        </main>

        <footer className="mt-16 sm:mt-20 text-center">
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 sm:mb-6">
            <SocialLink icon={<GitHubLogoIcon />} href="https://github.com/thibaultmthh" />
            <SocialLink icon={<LinkedInLogoIcon />} href="https://www.linkedin.com/in/thibault-mathian/" />
            <SocialLink icon={<TwitterLogoIcon />} href="https://twitter.com/thibault_mthh" />
          </div>
          <p className="text-sm sm:text-base text-gray-600">Made with ❤️ by Thibault Mathian</p>
        </footer>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => (
  <a href={href} className="text-orange-500 hover:text-orange-600 transition-colors">
    {icon}
  </a>
);
