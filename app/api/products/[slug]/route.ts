import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  return Response.json({ product });
}
