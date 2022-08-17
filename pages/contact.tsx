import Contener from "components/Contener";
import PageTitle from "components/PageTitle";
import Image from "next/image";

export default function Contact() {
  return (
    <Contener title="Contact" description="Contact">
      <PageTitle title="Contact" description="" />
      <p className="text-white">
        If you have any questions or a project in mind, feel free to contact me. <br /> Send me an email :{" "}
        <a className="text-violet-400 underline" href="mailto:contact@thibault.sh">
          contact@thibault.sh
        </a>
        <br />
      </p>
      <div className="grid place-items-center mt-7">
        <Image
          src="https://media.giphy.com/media/tbEjpqYUbeGyZtIcES/giphy.gif"
          width={400}
          height={210}
          alt="Let's discuss this"
        />
      </div>
    </Contener>
  );
}
