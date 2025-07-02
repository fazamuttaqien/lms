import { redirect } from "next/navigation";

import { getCourseSidebarData } from "@/app/data/user/get-course-sidebar-data";

interface iAppProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseSlugRoute({ params }: iAppProps) {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  const firstChapter = course.course.chapter[0];
  const firstLesson = firstChapter.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <div className='flex h-full items-center justify-center text-center'>
      <h2 className='mb-2 text-2xl font-bold'>No lessons avaiable</h2>
      <p className='text-muted-foreground'>
        This course does not have any lessons yet!
      </p>
    </div>
  );
}
