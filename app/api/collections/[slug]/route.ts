import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const products =
      slug === "all"
        ? await prisma.product.findMany()
        : await prisma.product.findMany({
            where: {
              Category: {
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
