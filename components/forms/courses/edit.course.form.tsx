"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { useState, useTransition } from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { toast } from "sonner";
import SubmitButton from "@/components/common/submit.button";
import { createCourseSchema, CreateCourseSchema } from "@/lib/schemas/course.schema";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/common/file-uploader";
import { ICourse } from "@/lib/types/course.type";
import editCourseAction from "@/app/actions/dashboard/courses/edit.course.action";

const EditCourseForm = ({ course }: { course: ICourse }) => {
    const [isPending, startTransition] = useTransition();
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleSetThumbnail = (file: File) => {
        setThumbnail(file);
    }

    const form = useForm<CreateCourseSchema>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: course.title || "",
            description: course.description || "",
            price: course.price || "",
        },
    });
    const onSubmit = async(data: CreateCourseSchema) => {

        const formData = new FormData();
        if(thumbnail){
            formData.append("thumbnail", thumbnail as File);
        }
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", String(data.price));

        startTransition(async () => {
            const res = await editCourseAction(formData, course._id)

            console.log("Edit Course Response: ", res);

            if(res.code === 400) {
                toast.error('Course update failed', {
                    description: res.message || "Course update failed",
                    duration: 2000,
                });
                return;
            }
            if(res.code === 403) {
                toast.error('Course update failed', {
                    description: res.message || "Course update failed",
                    duration: 2000,
                });
                return;
            }
            if(res.code === 200){
                toast.success('Course update successful', {
                    description: res.message || "Course updated successfully",
                    duration: 2000,
                });
                //form.reset();
                form.setValue("title", res.data.title);
                form.setValue("description", res.data.description);
                form.setValue("price", String(res.data.price));
            }
        });
    };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent>
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FileUploader
                accept="image/*"
                multiple={false}
                maxFiles={1}
                onChange={(files) => handleSetThumbnail(files[0])}
            />
            {/* <FileUploader
                accept="image/*"
                multiple
                maxFiles={10}
                onChange={(files) => console.log("Selected gallery images:", files)}
            /> */}
            {/* <FileUploader
                accept=".pdf,.doc,.docx"
                multiple
                onChange={(files) => console.log("Selected documents:", files)}
            /> */}
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input placeholder="Course Title" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Course Description" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input placeholder="Course Price" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <SubmitButton className="w-full" isPending={isPending}>Update course</SubmitButton>
        </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default EditCourseForm;