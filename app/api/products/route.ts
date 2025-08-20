import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const sort = searchParams.get("sort");

  const sortOptions = {
    new: { createdAt: "desc" as const },
    price_low: { price: "asc" as const },
    price_high: { price: "desc" as const },
  };

  const orderBy =
    sortOptions[sort as keyof typeof sortOptions] || sortOptions.new;

  const res = await prisma.product.findMany({ orderBy });

  return Response.json(res);
}
