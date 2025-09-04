import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Supabase authentication
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where = {
      profile_id: user.id,
      ...(status && { status }),
    };

    const [orders, totalCount] = await Promise.all([
      prisma.orders.findMany({
        where,
        include: { order_items: true },
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
      }),
      prisma.orders.count({ where }),
    ]);

    return NextResponse.json(
      {
        orders,
        totalCount,
        hasMore: totalCount > skip + limit,
        page,
        totalPage: Math.ceil(totalCount - limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Orders API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
