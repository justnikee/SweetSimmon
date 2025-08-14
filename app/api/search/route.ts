import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const searchText = (searchParams.get("query") || "").trim();

    if (!searchText) {
      return NextResponse.json({ status: 400, message: "Missing Query Param" });
    }

    const response = await prisma.product.findMany({
      where: {
        title: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });

    if (response.length === 0) {
      return NextResponse.json(
        { success: false, message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Search API error");
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
