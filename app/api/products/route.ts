import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient()

export async function GET() {
    const res = await prisma.product.findMany();
    if (res){
         return Response.json(res);
    }
}
