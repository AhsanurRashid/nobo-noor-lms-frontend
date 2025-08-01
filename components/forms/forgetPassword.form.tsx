"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { useTransition } from "react";
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
import { forgetPasswordSchema, ForgetPasswordSchema } from "@/lib/schemas/forgetPassword.schema";
import ForgetPassword from "@/app/actions/auth/forgetPassword.action";

const ForgetPasswordForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<ForgetPasswordSchema>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async(data: ForgetPasswordSchema) => {
        startTransition(async () => {
            const res = await ForgetPassword(data)

            if(res.code === 404) {
                toast.error('User not found', {
                    description: res.message || "User not found",
                    duration: 2000,
                });
                return;
            }

            if(res.code === 400) {
                toast.error('Email not found', {
                    description: res.message || "Email is required",
                    duration: 2000,
                });
                return;
            }

            if(res.code === 200){
                toast.success('Password reset link sent', {
                    description: res.message || "You can now purchase your courses",
                    duration: 2000,
                });
                form.reset();
            }
        });
    };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">Enter your email to reset your password</CardDescription>
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
                    <Input placeholder="Enter your email address here..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <SubmitButton className="w-full" isPending={isPending}>Send Reset Link</SubmitButton>
        </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default ForgetPasswordForm