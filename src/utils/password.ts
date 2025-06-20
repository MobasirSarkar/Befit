import * as bcrypt from "bcryptjs";

/**
 * Hashes a password with a salt using bcrypt.
 * @param password - Plain text password to hash.
 * @returns A Promise that resolves to the hashed password string.
 * */
export async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Password hashing failed:", error);
    throw new Error("Failed to process password");
  }
}

// Verify password with proper error handling
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Password verification failed:", error);
    return false;
  }
}
