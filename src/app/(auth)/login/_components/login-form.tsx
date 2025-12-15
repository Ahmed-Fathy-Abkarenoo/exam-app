"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFields } from "@/lib/types/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/auth.schema";
import useLogin from "../_hooks/use-login";
import AuthErrors from "@/components/layout/auth-errors/auth-errors";

export default function LoginForm() {
  // Mutations
  const { isPending, error, login } = useLogin();

  //State
  const [isVisible, setIsVisible] = useState(false);

  //React Hook
  const form = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = (values) => {
    login(values);
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      {/* Header */}
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-gray-800 pb-5">Login</CardTitle>
      </CardHeader>

      {/* Content */}
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>Password</FormLabel>

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

                  <div className="w-full text-end text-blue-600">
                    <Link href={"/forgot-password"}>Forgot your password?</Link>
                  </div>
                </FormItem>
              )}
            />

            {/* Response Error */}
            {error && <AuthErrors authError={error} />}
            {/* {error && <p className="w-full text-red-600 text-center border border-red-600">{error.message}</p>} */}

            {/* submit */}
            <div className="w-full flex flex-col gap-9 pt-6">
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || (!form.formState.isValid && form.formState.isSubmitting)}>
                Login
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
  );
}
