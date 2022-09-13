import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === "GET"){
        const datas = await prisma?.guestbook.findMany()
        return res.status(200).json(datas)
    }
   
    res.status(400)
}
