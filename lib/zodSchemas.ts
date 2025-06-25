import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
    "Development",
    "Business",
    "Finance",
    "IT & Software",
    "Office Productivity",
    "Design",
    "Personal Development",
    "Marketing",
    "Health & Fitness",
    "Music",
    "Photography",
] as const;

export const courseSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters long"
    }).max(100, {
        message: "Title must not exceed 100 characters"
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters long"
    }),
    fileKey: z.string().min(1, {
        message: "File is required"
    }),
    price: z.coerce.number().min(1, {
        message: "Price must be a positive number"
    }),
    duration: z.coerce.number().min(1, {
        message: "Duration must be at least 1 minute"
    }).max(500, {
        message: "Duration must not exceed 500 minutes"
    }),
    level: z.enum(courseLevels, {
        message: "Level is required"
    }),
    category: z.enum(courseCategories, {
        message: "Category is required"
    }),
    smallDescription: z.string().min(3, {
        message: "Small description must be at least 3 characters long"
    }).max(200, {
        message: "Small description must not exceed 200 characters"
    }),
    slug: z.string().min(3, {
        message: "Slog must be at least 3 characters long"
    }),
    status: z.enum(courseStatus, {
        message: "Status is required"
    })
})

export type CourseSchemaType = z.infer<typeof courseSchema>;