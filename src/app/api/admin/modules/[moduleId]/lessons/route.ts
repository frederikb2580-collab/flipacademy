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
  { params }: { params: Promise<{ moduleId: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { moduleId } = await params;
  const body = await req.json();

  const lastLesson = await db.lesson.findFirst({
    where: { moduleId },
    orderBy: { order: "desc" },
  });

  const lesson = await db.lesson.create({
    data: {
      moduleId,
      title: body.title,
      description: body.description,
      content: body.content,
      videoUrl: body.videoUrl || null,
      type: body.type ?? "VIDEO",
      published: body.published ?? false,
      duration: body.duration,
      order: (lastLesson?.order ?? 0) + 1,
    },
  });

  return NextResponse.json(lesson, { status: 201 });
}
