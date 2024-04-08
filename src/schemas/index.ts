import * as z from "zod";

export const DeviceSchema = z.object({
  type: z.string().min(3, { message: "Type is not long enough" }).trim(),
  status: z.string().min(5, { message: "Status is not long enough" }).trim(),
});

export const LocationSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name is not long enough" })
    .max(50, { message: "Name is too long" }),
  address: z.string().min(5, { message: "Address is not long enough" }).trim(),
  phone: z
    .string()
    .min(9, { message: "Phone Number is not long enough" })
    .max(10, { message: "Phone Number is too long" })
    .trim(),
});

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is Required" }).email(),
  password: z.string().min(1, { message: "Password is Required" }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "User Name is Required" }),
    email: z.string().min(1, { message: "Email is Required" }).email(),
    password: z.string().min(8, { message: "Must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Must be at least 8 characters" }),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirmPassword) return false;
      return true;
    },
    { message: "Password don't match", path: ["confirmPassword"] }
  );
