import Contener from "components/Contener";
import Message from "components/Message";
import PageTitle from "components/PageTitle";
import { useState } from "react";

export default function Guestbook() {
  const l = [
    "red",
    "green",
    "red",
    "violet",
    "red",
    "green",
    "red",
    "green",
    "red",
    "green",
    "red",
    "green",
    "red",
    "green",
    "red",
    "green",
    "red",
    "green",
    "red",
    "green",
  ];
  const [guestbook, setGuestbook] = useState([l, l, l, l, l, l, l, l, l, l, l, l, l, l, l, l, l, l, l, l]);

  return (
    <Contener title="Guestbook" description="Leave a message on this guestbook">
      <PageTitle
        title="Guestbook"
        description="Leave a pixel below, this is community art created by this website visitors. For each pixels you can leave a short message. "
      />
      <div className="mb-7">
        <h1 className="font-bold text-2xl text-white mb-7">Canvas : </h1>
        <div className="grid place-items-center">
          <div>
            {guestbook.map((row, rowIndex) => (
              <div key={rowIndex} className="flex ">
                {row.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    style={{ backgroundColor: color }}
                    className="w-4 h-4 sm:w-6 sm:h-6  border-violet-300 hover:border  "
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-2xl text-white mb-7">Guestbook : </h1>
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </Contener>
  );
}

//repeat(2, minmax(0, 1fr));
