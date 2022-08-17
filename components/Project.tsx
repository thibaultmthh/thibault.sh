import Image from "next/image";
import parakeet from "public/images/parakeet_accpage.png";
import Button from "./Button";
import Keyword from "./Keyword";

export default function Project({ name }: { name: string }) {
  return (
    <div className=" py-8 max-w-lg  lg:max-w-4xl ">
      <div className="mb-3">
        <span className="font-medium text-xl text-white mr-5 ">{name}</span>
        <span className="text-neutral-300 text-sm">2021</span>
      </div>

      <div className="block lg:flex ">
        <div className="max-w-lg  md:max-w-xl">
          <Image src={parakeet} alt="parakeet" />
        </div>
        <div className="mt-2 lg:ml-5">
          <div className=" hidden lg:block ">
            <h2 className="text-white font-medium">Description: </h2>
            <p className="text-white">
              Parakeeet is a web application that allows you to create and share your own parakeet.
            </p>
          </div>
          <div className=" mt-2 sm:mt-0">
            <ul>
              <Keyword keyword="Typescript" strong />
              <Keyword keyword="Typescript" />
              <Keyword keyword="Typescript" />
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-around mt-2 sm:block sm:mt-0 sm:float-right">
        <Button>Learn more</Button>
      </div>
    </div>
  );
}
