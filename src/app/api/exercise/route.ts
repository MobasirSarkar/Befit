import { prisma } from "@/lib/db/prisma";
import { ExerciseSchema } from "@/types/exercises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const equipment = searchParams.get("equipment");
    const isCustom = searchParams.get("isCustom");
    const name = searchParams.get("name");
    const userId = searchParams.get("userId");

    const page = Number.parseInt(searchParams.get("page") || "1", 1);
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const filters: any = {};

    if (category) filters.category = category;
    if (equipment) filters.equipment = equipment;
    if (isCustom === "true") filters.isCustom = true;
    if (isCustom === "false") filters.isCustom = false;

    if (name) filters.name = { contains: name, mode: "insensitive" };
    if (userId && filters.isCustom) filters.createdBy = userId;

    const [data, total] = await Promise.all([
      prisma.exercise.findMany({
        where: filters,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.exercise.count({ where: filters }),
    ]);
    return NextResponse.json({
      data: data,
      pagination: {
        page: page,
        limit: limit,
        total_data: total,
        totalPages: Math.ceil(total / limit),
      },
      message: "data fetched successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch exercises" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ExerciseSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: validated.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }
    const exercise = await prisma.exercise.create({
      data: { ...validated.data, muscleGroup: validated.data.muscleGroup },
    });
    return NextResponse.json(
      { message: "Exercise created successfully", data: exercise },
      { status: 201 },
    );
  } catch (error) { }
}
