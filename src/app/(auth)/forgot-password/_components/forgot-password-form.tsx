"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordField } from "@/lib/types/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { MoveRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import VerifyOTP from "./verify-otp";
import { useEffect, useState } from "react";
import useForgotPassword from "../_hooks/use-forgot-password";
import AuthErrors from "@/components/layout/auth-errors/auth-errors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  // States

  const [isVisiable, setIsVisiable] = useState(false);

  // Queries
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () => null,
    initialData: () => {
      return queryClient.getQueryData(["userEmail"]) || "";
    },
  });

  // Mutation
  const { isPending, error, forgotPassword } = useForgotPassword();

  //React Hook
  const form = useForm<ForgotPasswordField>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  // On snbmit function
  const onSubmit: SubmitHandler<ForgotPasswordField> = async (values) => {
    forgotPassword(values, {
      onError: (error) => {
        form.reset(values, { keepValues: true });

        form.setError("root", { message: `${error?.message}` });

        setIsVisiable(false);
      },

      onSuccess: () => {
        setIsVisiable(true);
        toast.success("Code sent to your email", {
          position: "top-right",
        });
      },
    });
  };

  useEffect(() => {
    if (data) {
      form.setValue("email", data);
    }
  });

  return (
    <>
      {!isVisiable && (
        <Card className="bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="font-bold text-3xl text-gray-800">Forgot Password</CardTitle>
            <CardDescription className="text-gray-500 tracking-[0.13rem] pb-4">
              Don’t worry, we will help you recover your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {/* Label */}
                      <FormLabel>Email</FormLabel>

                      {/* Field */}
                      <FormControl>
                        <Input {...field} type="email" placeholder="user@example.com" />
                      </FormControl>

                      {/* Feedback */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Response Error */}
                {error && <AuthErrors authError={error} />}

                {/* submit */}
                <div className="w-full flex flex-col gap-9 pt-6">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending || (!form.formState.isValid && form.formState.isSubmitting)}>
                    Continue <MoveRight />
                  </Button>

                  <p className="w-full text-center">
                    Don’t have an account?{" "}
                    <Link href={"/register"} className="text-blue-600">
                      Create yours
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {isVisiable && <VerifyOTP formProps={{ vision: setIsVisiable, ...form }} />}
    </>
  );
}
