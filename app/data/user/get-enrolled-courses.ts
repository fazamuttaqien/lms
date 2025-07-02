import "server-only";

import { prisma } from "@/lib/db";

import { requiredUser } from "./require-user";

export async function getEnrolledCourse() {
  const user = await requiredUser();

  return await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      course: {
        select: {
          id: true,
          smallDescription: true,
          title: true,
          fileKey: true,
          level: true,
          slug: true,
          duration: true,
          chapter: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                      completed: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export type EnrolledCourseType = Awaited<
  ReturnType<typeof getEnrolledCourse>
>[0];
