import prisma from "lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "GET"){
        const totalViews = await prisma.view.aggregate({
            _sum: {
                count: true
            }
        })

        return res.status(200).json({
            totalViews: totalViews._sum.count || 0
        })
    }

}

export default handler;