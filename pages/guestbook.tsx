import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import CanvasGuestbook from "components/CanvasGuestbook";
import Contener from "components/Contener";
import Message from "components/Message";
import PageTitle from "components/PageTitle";
import Pixel from "components/Pixel";
import StickCursor from "components/StickCursor";
import guestbookTo2D from "lib/guestbook";
import { useState } from "react";

export default function Guestbook() {
  const { data, isLoading, isError } = useQuery(["/api/guestbook/"]) as {
    data: Prisma.GuestbookGetPayload<{}>[];
    isLoading: boolean;
    isError: boolean;
  };

  const canvas = guestbookTo2D(data || []);

  return (
    <Contener title="Guestbook - Thibault Mathian" description="Leave a message on this guestbook">
      <PageTitle
        title="Guestbook"
        description="Leave a pixel below, this is community art created by this website visitors. For each pixels you can leave a short message. "
      />
      <div className="mb-7">
        <Button>Leave a message</Button>
        <div className="p-2 m-2 border border-violet-600 rounded-md  ">
          <div>
            <label htmlFor="head" className="text-white">
              Choose a color
            </label>
            <input type="color" id="head" name="head" value="#e66465" />
          </div>

          <StickCursor offsetY={-30}>Choose a spot</StickCursor>
          <input type="text" id="message" name="message" placeholder="Message" />
          <Button>Send</Button>
        </div>
      </div>
      <div className="mb-7">
        <h1 className="font-bold text-2xl text-white mb-7">Canvas : </h1>
        <CanvasGuestbook canvas={canvas} isReady={!isLoading && !isError} />
      </div>
      <div>
        <h1 className="font-bold text-2xl text-white mb-7">Guestbook : </h1>
        {data?.map((row, rowIndex) => (
          <Message key={row.id + "m"} post={row} canvas={canvas} />
        ))}
      </div>
    </Contener>
  );
}

//repeat(2, minmax(0, 1fr));
