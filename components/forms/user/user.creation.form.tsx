"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { toast } from "sonner";
import SubmitButton from "@/components/common/submit.button";
import createUserAction from "@/app/actions/dashboard/users/create.user.action";

const UserCreationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            phone: "",
            role: "student", // Default role can be set here
        },
    });
    const onSubmit = async(data: RegisterSchema) => {
        startTransition(async () => {
            const res = await createUserAction(data)
            
            if(res.code === 400) {
                toast.error('Registration failed', {
                    description: res.message || "Registration failed",
                    duration: 2000,
                });
                return;
            }
            if(res.code === 201){
                toast.success('Registration successful', {
                    description: res.message || "You can now log in",
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
            name="password"
            render={({ field }) => (
                <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input placeholder="••••••••" type={showPassword ? "text" : "password"} {...field} />
                </FormControl>
                <FormDescription onClick={togglePasswordVisibility} className="absolute right-2 top-2/3 transform -translate-y-1/2 cursor-pointer">
                {
                    showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />
                }
                    </FormDescription>
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
            <SubmitButton className="w-full" isPending={isPending}>Create User</SubmitButton>
        </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default UserCreationForm