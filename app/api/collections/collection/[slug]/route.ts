import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export async function GET(req: Request, {params}: {params: {slug: string}}){
    const slug = params.slug

    const res = await prisma.category.findUnique({where: {slug}});
    return Response.json(res)
}