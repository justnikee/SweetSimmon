import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id); 
  const product = await prisma.product.findUnique({
    where: { id },
  });

  return Response.json({ product });
}