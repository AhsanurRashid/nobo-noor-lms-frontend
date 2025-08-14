"use client";
import { useState, useTransition } from "react";
import { EditIcon, TrashIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import getUserByIdAction from "@/app/actions/dashboard/users/get.user.by.id";
import { ScrollArea } from "@/components/ui/scroll-area";
import deleteCourseAction from "@/app/actions/dashboard/courses/delete.course.action";
import { ICourse } from "@/lib/types/course.type";
import EditCourseForm from "@/components/forms/courses/edit.course.form";

const CourseActions = ({ course }: { course: ICourse }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [courseData, setCourseData] = useState<ICourse | null>(null);

  const handleDeleteCourse = async() => {
    startTransition(async () => {
      const res = await deleteCourseAction(course._id);

      console.log("Delete Course Response: ", res);

      if(res.error) {
          toast.error("Course not deleted", { description: res.error, duration: 2000 });
      }
      if(res.code === 400) {
          toast.error("Course not deleted", { description: res.error, duration: 2000 });
      }
      if(res.code === 403) {
          toast.error("Course not deleted", { description: res.error, duration: 2000 });
      }
      if(res.code === 500) {
          toast.error("Course not deleted", { description: res.error, duration: 2000 });
      }
      if(res.code === 200) {
          toast.success("Course deleted successfully", { description: res.message, duration: 2000 });
      }

      setOpen(false);
    })
  };

  const handleClick = () => {
    // startTransition(async () => {
    //   const res = await getUserByIdAction(course._id);
    //   setEditDialogOpen(true);
    //   if(res.code === 200){
    //     setCourseData(res.course);
    //   }
    // });
    setEditDialogOpen(true);
    setCourseData(course);
  };

  return (
    <div className="space-x-2">
      <Button
        onClick={handleClick}
        variant="outline"
        size="icon"
        className="size-8 bg-blue-900 text-white hover:bg-blue-800 hover:text-white dark:bg-blue-900 dark:hover:bg-blue-800"
      >
        {isPending ? <Loader2 className="animate-spin size-4" /> : <EditIcon />}
      </Button>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Edit: #{course?.title}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="w-full max-h-[calc(100vh-100px)]">
            <EditCourseForm course={courseData as ICourse} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="icon"
            className="size-8"
          >
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the course - {course.title}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCourse}
              className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin size-4" />}
              {isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CourseActions;
