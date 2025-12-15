import z from "zod";

//  Generall Schema
export const schema = z
  .object({
    username: z
      .string("username is require")
      .nonempty("Please enter your username")
      .min(2, "username must be not less than 2 character")
      .max(20),
    firstName: z
      .string("First name is require")
      .nonempty("Please enter your FirstName")
      .min(3, "FirstName length must be at least 3 characters long")
      .max(10),
    lastName: z
      .string("Last name is require")
      .nonempty("Please enter your lastNamer")
      .min(3, "lastName length must be at least 3 characters long")
      .max(10),

    email: z.email("In-Valid Email").nonempty("Email is Require"),

    phone: z
      .string("phone number is require")
      .nonempty("Please enter your phone number")
      .regex(/^(002|\+2)?01[0125][0-9]{8}$/, "Please enter a valid number"),

    password: z
      .string("password is require")
      .nonempty("Please enter your password")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must be at least 8 characters, one uppercase letter,one lowercase letter and one special character"
      ),
    rePassword: z.string().nonempty("Please enter your rePassword"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password and rePassword don't match",
    path: ["rePassword"],

    // when(payload) {
    //   return schema.pick({ password: true, rePassword: true }).safeParse(payload.value).success;
    // },
  });

// Login Schema
export const loginSchema = schema.pick({ email: true, password: true });

// Regiser Schema
export const registerSchema = schema;

// Forgot Password Schema
export const forgotPasswordSchema = schema.pick({ email: true });

//OTP Schema
export const OtpSchema = z.object({
  resetCode: z.string().length(6, "Code must be 6 characters").nonempty("OTP code is require"),
});

// New Password Schema
export const newPasswordSchems = schema
  .partial({
    username: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password and rePassword don't match",
    path: ["rePassword"],
  });

// Change Password
export const changePasswrodSchema = newPasswordSchems
  .safeExtend({
    oldPassword: z
      .string("password is require")
      .nonempty("Please enter your password")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must be at least 8 characters, one uppercase letter,one lowercase letter and one special character"
      ),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password and rePassword don't match",
    path: ["rePassword"],
  });

// Profile Schema
export const profileSchema = schema.omit({ password: true, rePassword: true }).partial();
