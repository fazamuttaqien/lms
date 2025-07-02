import { notFound } from "next/navigation";

import "server-only";

import { prisma } from "@/lib/db";

import { requiredUser } from "../user/require-user";

export async function getLessonContent(lessonId: string) {
  const session = await requiredUser();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      position: true,
      lessonProgress: {
        where: {
          userId: session.id,
        },
        select: {
          completed: true,
          lessonId: true,
        },
      },
      chapter: {
        select: {
          courseId: true,
          course: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.id,
        courseId: lesson.chapter.courseId,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrollment || enrollment.status === "Active") {
    return notFound();
  }

  return lesson;
}

export type LessonContentType = Awaited<ReturnType<typeof getLessonContent>>;
