import { Suspense } from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { EmptyState } from "@/components/general/EmptyState";

import { adminGetCourses } from "@/app/data/admin/admin-get-courses";

import {
  AdminCourseCard,
  AdminCourseCardSkeleton,
} from "./_components/AdminCourseCard";

// It should not using async/await
export default async function CoursesPage() {
  const data = await adminGetCourses();
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Your Courses</h1>
        {data.length > 0 && (
          <Link className={buttonVariants()} href='/admin/courses/create'>
            Create Course
          </Link>
        )}
      </div>

      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </>
  );
}

async function RenderCourses() {
  const data = await adminGetCourses();

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title='No courses found'
          description='Create a new course to get started'
          buttonText='Create Course'
          href={`/admin/courses/create`}
        />
      ) : (
        <div className='grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
          {data.map(course => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
}

function AdminCourseCardSkeletonLayout() {
  return (
    <div className='grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
