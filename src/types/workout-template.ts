import { z } from "zod";
import { ExerciseCategoryEnum } from "./exercises";
export const WorkOutTemplateSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  category: ExerciseCategoryEnum.optional(),
  userId: z.string().min(1, "User ID is required"),
  isPublic: z.boolean().optional().default(false),
});
