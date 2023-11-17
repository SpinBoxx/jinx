import { z } from "zod";
import {
  passwordMaxLength,
  passwordMinLength,
  usernameMaxLength,
  usernameMinLength,
} from "./zod-message-helper";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(usernameMinLength).max(usernameMaxLength),
  password: z.string().min(passwordMinLength).max(passwordMaxLength),
});

export const loginSchena = z.object({
  email: z.string().email(),
  password: z.string().min(passwordMinLength).max(passwordMaxLength),
});
