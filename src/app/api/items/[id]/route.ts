import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: any) {
  const { id } = await params;
  const db = await connectToDb();
  const item = await db.collection("items").findOne({
    _id: new ObjectId(id),
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: any) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = await connectToDb();
  const body = await req.json();

  const result = await db.collection("items").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: body },
    { returnDocument: "after" }
  );

  if (!result) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest, { params }: any) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = await connectToDb();
  const result = await db.collection("items").deleteOne({
    _id: new ObjectId(id),
  });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
