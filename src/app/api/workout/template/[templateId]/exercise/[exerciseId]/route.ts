import { prisma } from "@/lib/db/prisma";
import { TemplateExerciseParamsProps } from "@/types/General";
import { TemplateExerciseSchema } from "@/types/template-exercise";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: TemplateExerciseParamsProps,
) {
  try {
    const body = await req.json();
    const validated = TemplateExerciseSchema.partial().safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.flatten().fieldErrors },
        {
          status: 400,
        },
      );
    }
    const updated = await prisma.templateExercise.update({
      where: { id: params.exerciseId },
      data: validated.data,
    });
    return NextResponse.json(
      { message: "Exercise Updated", data: updated },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update exercise" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: TemplateExerciseParamsProps,
) {
  try {
    await prisma.templateExercise.delete({
      where: { id: params.exerciseId },
    });
    return NextResponse.json({ message: "Exercise Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete exercise" },
      { status: 500 },
    );
  }
}
