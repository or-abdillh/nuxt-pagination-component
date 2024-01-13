import { PrismaClient } from "@prisma/client"
import { pagination } from "prisma-extension-pagination"

// parsed model
const prisma = new PrismaClient().$extends(pagination())

export default defineEventHandler(async (event) => {

    // parsed query
    const { take, page } = getQuery(event)

    // query: get all article with pagination
    const [items, meta] = await prisma.post.paginate({
        where: {
            published: true
        }
    }).withPages({
        limit: take ? parseInt(take.toString()) : 10,
        page: page ? parseInt(page.toString()) : 1,
        includePageCount: true
    })

    // aliased types
    return {
        status: true,
        code: 200,
        data: {
            article: {
                meta: {
                    ...meta,
                    take: take ? parseInt(take.toString()) : 10
                },
                items
            }
        }
    }
})
