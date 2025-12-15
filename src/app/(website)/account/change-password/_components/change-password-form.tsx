"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordFields } from "@/lib/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { changePasswrodSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthErrors from "@/components/layout/auth-errors/auth-errors";
import useChangePassword from "../_hooks/use-change-password";

export default function ChangePasswordForm() {
  // Mutations
  const { isPending, error, changePassword } = useChangePassword();

  // State
  const [isVisible, setIsVisible] = useState(false);

  // React Hook
  const form = useForm<ChangePasswordFields>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswrodSchema),
    mode: "onBlur",
  });

  // On Submit
  const onSubmit: SubmitHandler<ChangePasswordFields> = async (values) => {
    changePassword(values);
  };

  // Return
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* currentPassword */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="border-b border-gray-100 pb-6">
                  {/* Label */}
                  <FormLabel>Current Password</FormLabel>

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

            {/* NewPassword */}
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
                  <FormLabel>Confirm New Password</FormLabel>

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
            <div className="w-full flex flex-col gap-5 pt-5">
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || (!form.formState.isValid && form.formState.isSubmitting)}>
                Update Password
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
