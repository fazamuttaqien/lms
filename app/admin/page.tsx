import { Suspense } from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { EmptyState } from "@/components/general/EmptyState";
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";

import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses";
import {
  AdminCourseCard,
  AdminCourseCardSkeleton,
} from "./courses/_components/AdminCourseCard";

export default async function AdminIndexPage() {
  const enrollmentData = await adminGetEnrollmentStats();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />
      <div className='space-y-4'>
        <div className='jutify-between flex items-center'>
          <h2 className='text-xl font-semibold'>Recent Courses</h2>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href='/admin/courses'
          >
            View All Courses
          </Link>
        </div>

        <Suspense fallback={<RenderRecentCousesSkeletonLayout />}>
          <RenderRecentCourse />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourse() {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText='Create new Couse'
        description='You dont have any courses. Create some to see them here'
        title='You dont have any courses yes!'
        href='/admin/courses/create'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {data.map(course => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function RenderRecentCousesSkeletonLayout() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
