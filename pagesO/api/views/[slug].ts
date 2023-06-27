
import prisma from 'lib/prisma'
import { NextApiHandler } from 'next'




const handler: NextApiHandler = async (req, res) => {
    console.log(req.query, req.method);
    
    try {
    const slug = req.query.slug?.toString()

    if (!slug) {
        return res.status(400).json({
            message: 'Missing slug'
        })
    }
    if (req.method === "GET"){
        const views = await prisma.view.findUnique({
            where: {
                slug
            }
        })
        return res.status(200).json({ 
            views: views?.count || 0
        })
    }
    if (req.method === "POST"){
        const views = await prisma.view.upsert({
            where: {
                slug
            },
            create: {
                slug,
                count: 1
            },
            update: {
                count: {
                    increment: 1
                }
            }
        })
        return res.status(200).json({ 
            views: views?.count || 0
        })
    }
    res.status(400).json({ message: 'Invalid method'})
    }
    catch (error) {
       return res.status(500).json({ message: (error as {message:string}).message })
    }
    
}

export default handler