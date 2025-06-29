import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient()

export async function GET(req: Request, {params} : {params: {slug: string}}){
    const slug = params.slug
    console.log("slug", slug)
    try {
        const product = slug === 'all' 
        ? await prisma.product.findMany() 
        : await prisma.product.findMany({where: {category: {slug: slug}}});

        return Response.json(product)
    } catch (error) {
        return Response.json({message: "someting went wrong", error})
    }
}