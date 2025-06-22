import { z } from "zod";

// Step 1: Define the categories as a Zod enum
export const ExerciseCategoryEnum = z.enum(
  [
    "CHEST",
    "UPPER_CHEST",
    "MIDDLE_CHEST",
    "LOWER_CHEST",
    "BACK",
    "LATS",
    "TRAPS",
    "LOWER_BACK",
    "SHOULDERS",
    "FRONT_DELTS",
    "SIDE_DELTS",
    "REAR_DELTS",
    "BICEPS",
    "TRICEPS",
    "FOREARMS",
    "NECK",
    "LEGS",
    "QUADS",
    "HAMSTRINGS",
    "CALVES",
    "GLUTES",
    "ADDUCTORS",
    "ABDUCTORS",
    "CORE",
    "UPPER_ABS",
    "LOWER_ABS",
    "OBLIQUES",
    "TRANSVERSE_ABS",
    "PELVIC_FLOOR",
    "FULL_BODY",
    "CARDIO",
    "MOBILITY",
    "STRETCHING",
    "POSTURE",
  ],
  {
    errorMap: () => ({ message: "Invalid Category" }),
  },
);

export type ExerciseCategory = z.infer<typeof ExerciseCategoryEnum>;

// Step 2: Use the enum in your schema
export const ExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  description: z.string().optional(),

  category: ExerciseCategoryEnum, // strict validation
  muscleGroup: z.array(z.string()),
  equipment: z.string().optional(),
  instructions: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isCustom: z.boolean().default(false),
  createdBy: z.string().optional(),
});
