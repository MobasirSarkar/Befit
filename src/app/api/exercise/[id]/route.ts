import { prisma } from "@/lib/db/prisma";
import { ExerciseSchema } from "@/types/exercises";
import { ParamsProps } from "@/types/General";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: ParamsProps) {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: params.id },
    });
    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: exercise }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exercise" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: ParamsProps) {
  try {
    const body = await req.json();
    const validated = ExerciseSchema.partial().safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const exercise = await prisma.exercise.update({
      where: { id: params.id },
      data: validated.data,
    });
    return NextResponse.json(
      { message: "Exercise Updated", data: exercise },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to udpate exercise" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: NextRequest, { params }: ParamsProps) {
  try {
    await prisma.exercise.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Exercise deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete exercise" },
      { status: 500 },
    );
  }
}
