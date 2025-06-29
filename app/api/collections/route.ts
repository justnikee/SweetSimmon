import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export async function GET(){
    try {
        const categories = await prisma.category.findMany();
        return Response.json(categories)
    } catch (error) {
        return Response.json({message: "something went wrong", error})
    }
}