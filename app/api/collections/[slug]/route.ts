import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ slug: string }>}
) {
  const { slug } = await context.params;

  try {
    const products =
      slug === "all"
        ? await prisma.product.findMany()
        : await prisma.product.findMany({
            where: {
              category: {
                slug: slug,
              },
            },
          });

    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
}
