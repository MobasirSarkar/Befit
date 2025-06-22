import { prisma } from "@/lib/db/prisma";
import { WorkOutTemplateSchema } from "@/types/workout-template";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    const category = searchParams.get("category");
    const isPublic = searchParams.get("isPublic");

    const page = Number.parseInt(searchParams.get("page") || "1", 1);
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) / limit;

    const filters: any = {};

    if (userId) filters.userId = userId;
    if (category) filters.category = category;
    if (isPublic !== null) filters.isPublic === "true";

    const [data, total] = await Promise.all([
      prisma.workoutTemplate.findMany({
        where: filters,
        orderBy: { createdAt: "desc" },
        include: {
          exercises: { include: { exercise: true } },
        },
        skip,
        take: limit,
      }),
      prisma.workoutTemplate.count({ where: filters }),
    ]);

    return NextResponse.json({
      data: data,
      pagination: {
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
        totalData: total,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch workout templates" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = WorkOutTemplateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const template = await prisma.workoutTemplate.create({
      data: parsed.data,
    });

    return NextResponse.json(
      {
        message: "Workout template created",
        data: template,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create workout template" },
      { status: 500 },
    );
  }
}
