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
  const users = await db.collection("user").find({}, { projection: { password: 0 } }).toArray();
  return NextResponse.json(users);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }

  const db = await connectToDb();
  await db.collection("user").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ message: "User deleted" });
}
