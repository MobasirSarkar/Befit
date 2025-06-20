"use server";

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/types/AuthSchema";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const validatedFields = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return "Invalid email or password format.";
    }

    const { email, password } = validatedFields.data;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result) {
      return "Invalid credentials.";
    }
  } catch (error: any) {
    // Handle different types of authentication errors
    if (error.message?.includes("CredentialsSignin")) {
      return "Invalid credentials.";
    }
    if (
      error.message?.includes("rate limit") ||
      error.message?.includes("too many")
    ) {
      return "Too many login attempts. Please try again later.";
    }
    if (error.type === "CallbackRouteError") {
      return "Authentication failed. Please try again.";
    }

    console.error("Authentication error:", error);
    return "Something went wrong. Please try again.";
  }

  redirect("/dashboard");
}

export async function signInWithGoogle() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
}
