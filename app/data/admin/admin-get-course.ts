import { prisma } from '@/lib/db';
import { requiredAdmin } from './require-admin';
import { notFound } from 'next/navigation';

export async function adminGetCourse(id: string) {
  await requiredAdmin();
  const data = await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      smallDescription: true,
      category: true,
      slug: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminCourseSingularType = Awaited<
  ReturnType<typeof adminGetCourse>
>;
