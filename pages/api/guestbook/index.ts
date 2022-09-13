import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === "POST"){
        const { name, message, positionX, positionY, color } = req.body
        const data = await prisma?.guestbook.create({
            data: {

                name,
                message,
                positionX,
                positionY,
                color,
                
            }})
        return res.status(200).json(data)
    }

     if (req.method === "GET"){
        const centerx = Number(req.query.centerx || 0 )
        const centery = Number(req.query.centery || 0 )
        const radius = Number(req.query.radius || 100 )
        const datas = await prisma?.guestbook.findMany({
            select: {
                id: true,
                name: true,
                positionX: true,
                positionY: true,
                color: true,
                message: true,
                createdAt: true,
            
            },
                

            orderBy: {
                createdAt: "desc",
            },
            where: {
                positionX: {
                    gt: centerx - radius,
                    lt: centerx + radius,
                },
                positionY: {
                    gt: centery - radius,
                    lt: centery + radius,
                },
            },
        })
        return res.status(200).json(datas)
    }

    return res.status(400)

  
}
