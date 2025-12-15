import { User } from "next-auth";
import z from "zod";
import {
  changePasswrodSchema,
  loginSchema,
  newPasswordSchems,
  OtpSchema,
  profileSchema,
  registerSchema,
} from "../schemas/auth.schema";

// Fields Types
export type RegisterFields = z.infer<typeof registerSchema>;

export type LoginFields = z.infer<typeof loginSchema>;

export type ForgotPasswordField = {
  email: string;
};

export type OtpField = z.infer<typeof OtpSchema>;

export type NewPasswordFields = z.infer<typeof newPasswordSchems>;

export type ChangePasswordFields = z.infer<typeof changePasswrodSchema>;

export type profileFields = z.infer<typeof profileSchema>;

// Response Types
export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type RegisterResponse = LoginResponse;

export type ForgotPasswordResponse = {
  info: string;
};

export type VerifyOTPResponse = {
  status: string;
};

export type NewPasswordResponse = {
  token: string;
};

export type ProfileResponse = {
  user: User["user"];
};
