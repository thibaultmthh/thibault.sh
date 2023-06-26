import { Guestbook } from "types";

export default function guestbookTo2D(guestbook: Guestbook[]) {
  const xy: Guestbook[][][] = new Array(20).fill(0).map(() => new Array(20).fill(0).map(() => []));

  if (guestbook) {
    for (let i = 0; i < guestbook.length; i++) {
      const element = guestbook[i];
      xy[element.positionX][element.positionY].push(element);
    }
  }
  return xy;
}
