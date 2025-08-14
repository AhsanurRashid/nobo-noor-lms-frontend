"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTransition } from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { toast } from "sonner";
import SubmitButton from "@/components/common/submit.button";
import { User } from "@/lib/types/user.type";
import { editUserSchema, EditUserSchema } from "@/lib/schemas/edit.user.schema";
import editUserAction from "@/app/actions/dashboard/users/edit.user.action";

const UserUpdateForm = ({userData}: {userData: User | null}) => {
    const [isPending, startTransition] = useTransition();

    if(!userData) {
        return (
            <div className="text-center text-red-500 font-light text-xs">No user data available</div>
        )
    }

    const form = useForm<EditUserSchema>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            email: userData.email || "",
            name: userData.name || "",
            phone: userData.phone || "",
            role: (userData.role as "student" | "instructor" | "admin") || "student", // Default role can be set here
        },
    });
    const onSubmit = async(data: EditUserSchema) => {
        startTransition(async () => {
            const res = await editUserAction(data, userData._id)

            if(res.code === 400) {
                toast.error('Update failed', {
                    description: res.message || "User update failed",
                    duration: 2000,
                });
                return;
            }
            if(res.code === 200){
                toast.success('Update successful', {
                    description: res.message || "User updated successfully",
                    duration: 2000,
                });
                // form.reset();
                form.setValue("email", res.user.email);
                form.setValue("name", res.user.name);
                form.setValue("phone", res.user.phone);
                form.setValue("role", res.user.role);
            }
        });
    };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent>
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="example@me.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                    <Input placeholder="+8801XXXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem className="w-full flex items-center">
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <SubmitButton className="w-full" isPending={isPending}>Update User</SubmitButton>
        </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default UserUpdateForm