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
import createCourseAction from "@/app/actions/dashboard/courses/create.course.acton";

const CourseCreationForm = () => {
    const [isPending, startTransition] = useTransition();
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleSetThumbnail = (file: File) => {
        setThumbnail(file);
    }

    const form = useForm<CreateCourseSchema>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
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
            const res = await createCourseAction(formData)

            if(res.code === 400) {
                toast.error('Course creation failed', {
                    description: res.message || "Course creation failed",
                    duration: 2000,
                });
                return;
            }
            if(res.code === 403) {
                toast.error('Course creation failed', {
                    description: res.message || "Course creation failed",
                    duration: 2000,
                });
                return;
            }
            if(res.code === 201){
                toast.success('Course creation successful', {
                    description: res.message || "Course created successfully",
                    duration: 2000,
                });
                form.reset();
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
            <SubmitButton className="w-full" isPending={isPending}>Create course</SubmitButton>
        </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default CourseCreationForm;