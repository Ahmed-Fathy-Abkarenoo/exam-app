"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordFields } from "@/lib/types/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { newPasswordSchems } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useNewPassword from "../_hooks/use-new-password";
import AuthErrors from "@/components/layout/auth-errors/auth-errors";
import { useQuery } from "@tanstack/react-query";

export default function NewPassword() {
  // State
  const [isVisible, setIsVisible] = useState(false);

  // Queries
  const { data } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () => null,
    staleTime: Infinity,
  });

  // Mutation
  const { isPending, error, newPassword } = useNewPassword();

  // React Hook
  const form = useForm<NewPasswordFields>({
    defaultValues: {
      password: "",
      rePassword: "",
      email: `${data}`,
    },
    resolver: zodResolver(newPasswordSchems),
    mode: "onBlur",
  });

  // On Submit
  const onSubmit: SubmitHandler<NewPasswordFields> = async (values) => {
    console.log(values);
    // console.log(data);

    // form.setValue("email", `${data}`);

    newPassword(values, {
      onError: (error) => {
        form.setError("root", { message: `${error.message}` });
      },
    });
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-gray-800 pb-2">Create Account</CardTitle>
        <CardDescription className="tracking-widest">Create a new strong password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>New Password</FormLabel>

                  {/* Field */}
                  <div className="relative">
                    <FormControl>
                      <Input {...field} type={isVisible ? "text" : "password"} placeholder="********" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsVisible((prevState) => !prevState)}
                      className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent">
                      {isVisible ? <EyeIcon /> : <EyeOffIcon />}
                      <span className="sr-only">{isVisible ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* rePassword */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>Confirm Password</FormLabel>

                  {/* Field */}
                  <div className="relative">
                    <FormControl>
                      <Input {...field} type={isVisible ? "text" : "password"} placeholder="********" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsVisible((prevState) => !prevState)}
                      className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent">
                      {isVisible ? <EyeIcon /> : <EyeOffIcon />}
                      <span className="sr-only">{isVisible ? "Hide rePassword" : "Show rePassword"}</span>
                    </Button>
                  </div>

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
                Reset Password
              </Button>

              <p className="w-full text-center text-gray-500 text-sm tracking-widest">
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
  );
}
