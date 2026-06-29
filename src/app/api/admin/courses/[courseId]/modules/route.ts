import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "ADMIN") return null;
  return session;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId } = await params;
  const body = await req.json();

  const lastModule = await db.module.findFirst({
    where: { courseId },
    orderBy: { order: "desc" },
  });

  const module = await db.module.create({
    data: {
      courseId,
      title: body.title,
      description: body.description,
      published: body.published ?? false,
      order: (lastModule?.order ?? 0) + 1,
    },
  });

  return NextResponse.json(module, { status: 201 });
}
