import Button from "components/Button";
import Contener from "components/Contener";
import Project from "components/Project";
import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";
import me from "public/images/me.jpg";

const Home: NextPage = () => {
  return (
    <Contener
      title="Thibault Mathian"
      description="I am a fullstack developper living in Grenoble. I love to code and I love to create. I am a self-taught developer and I am always looking for new challenges."
    >
      <div className="flex flex-col-reverse  sm:flex-row sm:justify-between mb-32">
        <div>
          <h1 className="font-bold text-5xl text-white">Thibault Mathian</h1>
          <h2 className="text-base mt-1 text-neutral-300">Freelance Fullstack developper 🧑‍💻</h2>
        </div>
        <div className="w-24 h-24 mb-6 sm:mb-0 sm:w-40 sm:h-40">
          <Image className="rounded-full mx-auto" src={me} alt="me" width={150} height={150} />
        </div>
      </div>
      <div className="mb-32">
        <h1 className="font-bold text-2xl text-white">Who am I ?</h1>
        <p className="text-base text-neutral-300">
          I am a fullstack developper living in Grenoble. I love to code and I love to create. I am a self-taught
          developer and I am always looking for new challenges.
          <div className="my-3 sm:float-right sm:my-2	">
            <Button>
              <Link href={"/about"}>More</Link>
            </Button>
          </div>
        </p>
      </div>
      <div className="mb-20">
        <h1 className="font-bold text-2xl text-white mb-5">Some of my Projects</h1>
        <ul>
          <Project name="Parakeet" />
          <Project name="Brolt" />
          <Project name="Seig" />
        </ul>
        <div className="mt-10 flex justify-around">
          <Button>
            <Link href={"/projects"}> See all projects</Link>
          </Button>
        </div>
      </div>
    </Contener>
  );
};

export default Home;
