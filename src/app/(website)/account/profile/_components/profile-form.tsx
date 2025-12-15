"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthErrors from "@/components/layout/auth-errors/auth-errors";
import Swal from "sweetalert2";
import useDeleteAccount from "../_hooks/use-delete-account";
import { useSession } from "next-auth/react";
import useUpdateAccount from "../_hooks/use-update-info";
import { profileFields } from "@/lib/types/auth";
import { profileSchema } from "@/lib/schemas/auth.schema";
import { toast } from "sonner";
import { User } from "next-auth";

type profileProps = {
  userInfo: User["user"];
};

export default function ProfileForm({ userInfo }: profileProps) {
  // Mutations
  const { isPending, error, updateAccount } = useUpdateAccount();
  const { pendingDelete, deleteError, deleteAccount } = useDeleteAccount();

  // Hooks
  const { data: session, update } = useSession();

  // React Hook
  const form = useForm<profileFields>({
    defaultValues: {
      username: `${userInfo.username}`,
      firstName: `${userInfo.firstName}`,
      lastName: `${userInfo.lastName}`,
      email: `${userInfo.email}`,
      phone: `${userInfo.phone}`,
    },
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  // Handel Click for Delete Button
  const handelClick = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: `bg-red-600 hover:bg-red-500 disable:${pendingDelete}`,
        cancelButton: "bg-gray-200 text-black hover:bg-gray-300",
        title: "font-medium text-red-600",
        footer: "bg-gray-50",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        width: "42rem",
        titleText: "Are you sure you want to delete your account?",
        text: "This action is permanent and cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "cancel!",
        reverseButtons: true,
        heightAuto: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteAccount(
            void {
              onError: () => {
                console.log(deleteError?.message);
              },
            }
          );
          if (!pendingDelete) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  // On Submit
  const onSubmit: SubmitHandler<profileFields> = async (values) => {
    updateAccount(values, {
      onSuccess: () => {
        toast.success("Profile Updated", {
          position: "top-right",
        });

        update({
          ...session,
          user: {
            ...session?.user,
            ...values,
          },
        });
      },
    });
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
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

            {/* Response Error */}
            {error && <AuthErrors authError={error} />}

            {/* submit */}
            <div className="w-full flex gap-5 pt-4">
              <Button
                type="button"
                className="w-1/2 bg-red-50 text-red-600 hover:bg-red-100"
                onClick={handelClick}
                disabled={isPending}>
                Delete My Account
              </Button>

              <Button
                type="submit"
                className="w-1/2"
                disabled={isPending || (!form.formState.isValid && form.formState.isSubmitting)}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
