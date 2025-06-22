import { z } from "zod";
export const TemplateExerciseSchema = z.object({
  exerciseId: z.string().min(1, "Exercise ID is required"),
  order: z.number().int().min(0, "order must be a non-negative integer"),
  targetSets: z
    .number()
    .int()
    .min(1, "Target sets must be at least 1")
    .optional(),
  targetReps: z
    .number()
    .int()
    .min(1, "Target reps must be at least 1")
    .optional(),
  targetWeight: z
    .number()
    .int()
    .min(0, "Target weight must be 0 or more")
    .optional(),
  targetDuration: z
    .number()
    .int()
    .min(0, "Duration must be 0 or more")
    .optional(),
  targetDistance: z
    .number()
    .int()
    .min(0, "Distance must be 0 or more")
    .optional(),
  restTime: z.number().int().min(0, "Rest time must be 0 or more").optional(),
  notes: z.string().optional(),
});
