"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import SubmitButton from "../common/submit.button";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchema } from "@/lib/schemas/login.schema";
import LoginAction from "@/app/actions/auth/login.action";

const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async(data: LoginSchema) => {
        startTransition(async () => {
            const res = await LoginAction(data)

            if(res.code === 404) {
                toast.error('Login failed', {
                    description: res.message || "Login failed with invalid credentials",
                    duration: 2000,
                });
                return;
            }

            if(res.code === 400) {
                toast.error('Login failed', {
                    description: res.message || "Login failed with invalid credentials",
                    duration: 2000,
                });
                return;
            }

            if(res.code === 200){
                toast.success('Login successful', {
                    description: res.message || "You can now purchase your courses",
                    duration: 2000,
                });
                router.push('/');
            }
        });
    };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
        <CardDescription className="text-center">Log in to your account</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
            <SubmitButton className="w-full" isPending={isPending}>Login</SubmitButton>
        </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default LoginForm