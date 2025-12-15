"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { OtpField } from "@/lib/types/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSchema } from "@/lib/schemas/auth.schema";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import NewPassword from "./new-password";
import { MoveLeft } from "lucide-react";
import useVerifyOTP from "../_hooks/use-verify-otp";
import AuthErrors from "@/components/layout/auth-errors/auth-errors";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function VerifyOTP({ formProps: { ...formProps } }) {
  // States
  const [isVisiable, setIsVisiable] = useState(false);

  // Queries
  const { data } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () => null,
    staleTime: Infinity,
  });

  // Mutation
  const { isPending, error, verifyOtp } = useVerifyOTP();

  //React Hook
  const form = useForm<OtpField>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(OtpSchema),
  });

  // Handle Click
  const handelClick = () => {
    formProps.reset();
    formProps.vision(false);
  };

  // On snbmit function
  const onSubmit: SubmitHandler<OtpField> = async (values) => {
    verifyOtp(values, {
      onError: (error) => {
        form.setError("root", { message: `${error?.message}` });

        setIsVisiable(false);
      },
      onSuccess: () => {
        setIsVisiable(true);
      },
    });
  };

  return (
    <>
      {!isVisiable && (
        <>
          <Link
            href={"/forgot-password"}
            className="w-10 h-10 border border-gray-200 flex items-center justify-center ms-6 mb-10"
            onClick={handelClick}>
            <MoveLeft />
          </Link>
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="font-bold text-3xl text-gray-800">Verify OTP</CardTitle>
              <CardDescription className="text-gray-500 pb-4">
                <p className="tracking-[0.14rem]">Please enter the 6-digits code we have sent to:</p>
                <p>
                  {data}
                  <Link
                    href={"/forgot-password"}
                    onClick={handelClick}
                    className="text-blue-600 underline ms-2 font-medium">
                    Edit
                  </Link>
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col items-center">
                  {/* OTP INPUTS */}
                  <FormField
                    control={form.control}
                    name="resetCode"
                    render={({ field }) => (
                      <FormItem>
                        {/* Field */}
                        <FormControl>
                          <InputOTP {...field} maxLength={6} id="otp" required>
                            <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>

                        {/* Feedback */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {false ? (
                    <p className="font-medium text-sm text-gray-500">You can request another code in: 60s</p>
                  ) : (
                    <p className="font-medium text-sm text-gray-500">
                      Didn’t receive the code?
                      <span className="text-blue-600 ms-2">
                        <button>Resend</button>
                      </span>
                    </p>
                  )}

                  {/* Response Error */}
                  {error && <AuthErrors authError={error} />}

                  {/* submit */}
                  <div className="w-full flex flex-col gap-9 pt-6">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending || (!form.formState.isValid && form.formState.isSubmitting)}>
                      Verify Code
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
        </>
      )}

      {isVisiable && <NewPassword />}
    </>
  );
}
