import "server-only";

import { prisma } from "@/lib/db";

import { requiredAdmin } from "./require-admin";

export async function adminGetDashboardStats() {
  await requiredAdmin();

  const [totalSignups, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      // Total Signups
      prisma.user.count(),

      // Total Customers
      prisma.user.count({
        where: {
          enrollment: {
            some: {},
          },
        },
      }),

      // Total Courses
      prisma.course.count(),

      // Total Lessons
      prisma.lesson.count(),
    ]);

  return {
    totalSignups,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
}
