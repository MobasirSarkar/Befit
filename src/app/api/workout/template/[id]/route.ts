import { prisma } from "@/lib/db/prisma";
import { ParamsProps } from "@/types/General";
import { WorkOutTemplateSchema } from "@/types/workout-template";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: ParamsProps) {
  try {
    const template = await prisma.workoutTemplate.findUnique({
      where: { id: params.id },
      include: {
        exercises: {
          include: { exercise: true },
        },
      },
    });
    if (!template) {
      return NextResponse.json(
        { error: "Workout Template not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        data: template,
        message: "template update successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch workout template" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: ParamsProps) {
  try {
    const body = await req.json();
    const parsed = WorkOutTemplateSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const template = await prisma.workoutTemplate.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json(
      { message: "Template updated successfully", data: template },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update workout template" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: NextRequest, { params }: ParamsProps) {
  try {
    await prisma.workoutTemplate.delete({ where: { id: params.id } });
    return NextResponse.json(
      { message: "Template deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete workout Template" },
      {
        status: 500,
      },
    );
  }
}
