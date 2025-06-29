import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString); 
  
  const product = await prisma.product.findUnique({
    where: { id },
  });

  return Response.json({ product });
}