"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFields } from "@/lib/types/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { registerSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../_hooks/use-register";
import AuthErrors from "@/components/layout/auth-errors/auth-errors";

export default function RegisterForm() {
  // Mutations
  const { isPending, error, register } = useRegister();

  // State
  const [isVisible, setIsVisible] = useState(false);

  // React Hook
  const form = useForm<RegisterFields>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // On Submit
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    register(values);
  };

  // Return
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-gray-800 pb-2">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="w-full flex items-center gap-3">
              {/* firstName */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    {/* Label */}
                    <FormLabel>First name</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input {...field} type="text" placeholder="Ahmed" />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* lastName */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    {/* Label */}
                    <FormLabel>Last name</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input {...field} type="text" placeholder="Fathy" />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* userName */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>username</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} type="text" placeholder="user123" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>Phone</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} type="tel" placeholder="0122382265" />
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
            <div className="w-full flex flex-col gap-5 pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || (!form.formState.isValid && form.formState.isSubmitting)}>
                Register
              </Button>

              <p className="w-full text-center">
                Don’t have an account?{" "}
                <Link href={"/login"} className="text-blue-600">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
