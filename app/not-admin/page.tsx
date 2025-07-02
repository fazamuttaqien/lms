import Link from "next/link";

import { ArrowLeft, ShieldX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotAdminRoute() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='bg-destructive/10 mx-auto w-fit rounded-full p-4'>
            <ShieldX className='text-destructive size-16' />
          </div>
          <CardTitle>Access Restricted</CardTitle>
          <CardDescription className='mx-auto max-w-xs'>
            Hey! You are not an admin, which means you can&apos;t create any
            courses of stuff like that...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href='/'
            className={buttonVariants({
              className: "w-full",
            })}
          >
            <ArrowLeft className='mr-1 size-4' />
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
