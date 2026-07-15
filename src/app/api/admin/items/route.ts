import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import { ObjectId } from "mongodb";
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
  const items = await db.collection("items").find().toArray();
  return NextResponse.json(items);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing item id" }, { status: 400 });
  }

  const db = await connectToDb();
  await db.collection("items").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ message: "Item deleted" });
}
