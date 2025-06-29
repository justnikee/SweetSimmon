import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export async function GET(_: Request, {params}: {params: Promise<{slug: string}>}){
    const { slug } = await params;

    const res = await prisma.category.findUnique({where: {slug}});
    return Response.json(res);
}