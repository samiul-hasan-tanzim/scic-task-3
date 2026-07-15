import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const db = await connectToDb();
  const { searchParams } = new URL(req.url);
  const createdBy = searchParams.get("createdBy");

  const query = createdBy ? { userEmail: createdBy } : {};
  const items = await db.collection("items").find(query).toArray();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await connectToDb();
  const body = await req.json();

  const newItem: any = {
    ...body,
    createdAt: new Date(),
  };

  const result = await db.collection("items").insertOne(newItem);
  newItem._id = result.insertedId;

  return NextResponse.json(newItem, { status: 201 });
}
