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
import { useRouter, usePathname  } from "next/navigation";
import { resetPasswordSchema, ResetPasswordSchema } from "@/lib/schemas/resetPassword.schema";
import ResetPasswordAction from "@/app/actions/auth/resetPassword.action";

const ResetPasswordForm = () => {
    const router = useRouter();
    const pathname = usePathname();
    const token = pathname.split("/").pop();
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
        },
    });
    const onSubmit = async(data: ResetPasswordSchema) => {
        startTransition(async () => {
            const res = await ResetPasswordAction(data, token)

            if(res.code === 400) {
                toast.error('Reset password failed', {
                    description: res.message || "Reset password failed with invalid credentials",
                    duration: 2000,
                });
                return;
            }

            if(res.code === 200){
                toast.success(res.message, {
                    description: "You can now login with your new password",
                    duration: 5000,
                });
                form.reset();
                router.push('/login');
            }
        });
    };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">Enter your new password to reset</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
                <SubmitButton className="w-full" isPending={isPending}>Reset Password</SubmitButton>
            </form>
        </Form>
       </CardContent>
    </Card> 
  )
}

export default ResetPasswordForm