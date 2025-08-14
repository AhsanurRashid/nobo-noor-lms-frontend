"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import RegisterAction from "@/app/actions/auth/register.action";
import { toast } from "sonner";
import SubmitButton from "../common/submit.button";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();
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
            const res = await RegisterAction(data)
            
            
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
                router.push('/login');
            }
        });
    };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Register</CardTitle>
        <CardDescription className="text-center">Create a new account</CardDescription>
      </CardHeader>
      <Separator />
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
            <SubmitButton className="w-full" isPending={isPending}>Register</SubmitButton>
        </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default RegisterForm