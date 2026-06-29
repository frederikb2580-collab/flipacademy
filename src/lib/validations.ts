import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ugyldig email"),
  password: z.string().min(6, "Adgangskode skal være mindst 6 tegn"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Navn skal være mindst 2 tegn"),
  email: z.string().email("Ugyldig email"),
  password: z.string().min(6, "Adgangskode skal være mindst 6 tegn"),
});

export const courseSchema = z.object({
  title: z.string().min(2, "Titel skal være mindst 2 tegn"),
  description: z.string().optional(),
  price: z.number().min(0, "Pris skal være positiv"),
  published: z.boolean().optional(),
});

export const moduleSchema = z.object({
  title: z.string().min(2, "Titel skal være mindst 2 tegn"),
  description: z.string().optional(),
  courseId: z.string(),
  published: z.boolean().optional(),
});

export const lessonSchema = z.object({
  title: z.string().min(2, "Titel skal være mindst 2 tegn"),
  description: z.string().optional(),
  content: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
  type: z.enum(["VIDEO", "TEXT", "PDF", "QUIZ"]).optional(),
  moduleId: z.string(),
  published: z.boolean().optional(),
});

export const couponSchema = z.object({
  code: z.string().min(3, "Kode skal være mindst 3 tegn"),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  value: z.number().min(1, "Værdi skal være mindst 1"),
  maxUses: z.number().optional(),
  expiresAt: z.string().optional(),
});
