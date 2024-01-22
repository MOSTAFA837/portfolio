import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();
    const { name, imageUrl } = body;

    const skill = await prismadb.skill.create({
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.log("[SKILLS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
