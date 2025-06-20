import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/types/AuthSchema";
import { getClientIP } from "@/utils/getIp";
import { hashPassword } from "@/utils/password";
import { registerRateLimiter } from "@/utils/rateLimiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIP = getClientIP(request);
    if (!registerRateLimiter.check(`${clientIP}-register`)) {
      return NextResponse.json(
        {
          error: "Too many registration attempts. Please try again later.",
        },
        { status: 429 },
      );
    }

    const validateFields = registerSchema.safeParse(body);
    if (!validateFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validateFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const { name, email, password } = validateFields.data;
    const normalizeEmail = email.toLowerCase().trim();
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizeEmail },
      select: { id: true },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        {
          status: 409,
        },
      );
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizeEmail,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        role: true,
      },
    });
    console.log(`new user registered: ${user.email}`);
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error: ", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        {
          error: "a user with this email already exists.",
        },
        {
          status: 409,
        },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
