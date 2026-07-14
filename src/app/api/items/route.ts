import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";

export async function GET() {
  const db = await connectToDb();
  const items = await db.collection("items").find().toArray();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
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
