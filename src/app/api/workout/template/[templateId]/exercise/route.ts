import { prisma } from "@/lib/db/prisma";
import { ParamsProps, TemplateParamsProps } from "@/types/General";
import { TemplateExerciseSchema } from "@/types/template-exercise";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: TemplateParamsProps) {
  try {
    const exercises = await prisma.templateExercise.findMany({
      where: { templateId: params.templateId },
      include: { exercise: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(
      {
        data: exercises,
        message: "data fetch successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[GET_TEMPLATE_EXERCISE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to load template exercise" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest, { params }: TemplateParamsProps) {
  try {
    const body = await req.json();
    const validated = TemplateExerciseSchema.safeParse(body);
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
    const data = validated.data;
    const created = await prisma.templateExercise.create({
      data: {
        ...data,
        templateId: params.templateId,
      },
    });
    return NextResponse.json(
      {
        message: "Exercise added to template",
        data: created,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("[POST_TEMPLATE_EXERCISE_ERROR]", error);
    return NextResponse.json(
      {
        error: "Failed to load template exercise",
      },
      {
        status: 500,
      },
    );
  }
}
