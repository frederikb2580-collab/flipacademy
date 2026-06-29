import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { courseSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const courses = await db.course.findMany({
    include: {
      modules: {
        include: { lessons: true },
        orderBy: { order: "asc" },
      },
      _count: { select: { orders: true } },
    },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = courseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const slug = slugify(parsed.data.title);
  const existing = await db.course.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "Et kursus med dette navn findes allerede" },
      { status: 409 }
    );
  }

  const lastCourse = await db.course.findFirst({
    orderBy: { order: "desc" },
  });

  const course = await db.course.create({
    data: {
      title: parsed.data.title,
      slug,
      description: parsed.data.description,
      price: parsed.data.price,
      published: parsed.data.published ?? false,
      order: (lastCourse?.order ?? 0) + 1,
    },
  });

  return NextResponse.json(course, { status: 201 });
}
