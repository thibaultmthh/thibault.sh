import Image from "next/image";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col">
        <Image
          src="https://media.giphy.com/media/Bp3dFfoqpCKFyXuSzP/giphy.gif"
          loading="lazy"
          height={200}
          width={200}
          alt="404"
        />
        <Link href="/">
          <a className="text-violet-400 font-medium underline mt-5 text-center">Back to a safe place</a>
        </Link>
      </div>
    </div>
  );
}
