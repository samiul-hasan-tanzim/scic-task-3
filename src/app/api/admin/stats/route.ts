import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import { auth } from "@/lib/auth";

async function isAdmin(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session?.user?.email === "admin@admin.com";
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await connectToDb();

  const totalUsers = await db.collection("user").countDocuments();
  const totalItems = await db.collection("items").countDocuments();

  const items = await db.collection("items").find().toArray();

  const categoryCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};
  const priceData: { range: string; count: number }[] = [
    { range: "$0–50", count: 0 },
    { range: "$51–200", count: 0 },
    { range: "$201–500", count: 0 },
    { range: "$501+", count: 0 },
  ];

  for (const item of items) {
    if (item.category) {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    }
    if (item.tags) {
      for (const tag of item.tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }
    const p = item.price || 0;
    if (p <= 50) priceData[0].count++;
    else if (p <= 200) priceData[1].count++;
    else if (p <= 500) priceData[2].count++;
    else priceData[3].count++;
  }

  const categoryChart = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  const tagChart = Object.entries(tagCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return NextResponse.json({
    totalUsers,
    totalItems,
    categoryChart,
    tagChart,
    priceData,
  });
}
