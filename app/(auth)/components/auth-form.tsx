"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { Eye, EyeOff, Loader2, LogIn, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import {
  emailNotValid,
  emailPlaceholder,
  passwordMaxErrorMessage,
  passwordMaxLength,
  passwordMinErrorMessage,
  passwordMinLength,
  passwordPlaceholder,
  usernameMaxErrorMessage,
  usernameMaxLength,
  usernameMinErrorMessage,
  usernameMinLength,
  usernamePlaceholder,
} from "@/lib/zod-message-helper";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { fetchCustom } from "@/lib/fetch-custom";

interface Props {
  className: string;
}

export async function Test() {
  console.log("test");
}

const AuthForm = ({ className }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const authLoginSuccessMessage = "Vous êtes bien connecté";
  const helperText = isLogin ? (
    <>
      <span>Pas de compte ?</span>
      <Link href="/register" className="text-blue-500 ">
        {" "}
        En créer un ici
      </Link>
    </>
  ) : (
    <>
      <span>Déjà un compte ?</span>
      <Link href="/login" className="text-blue-500 ">
        {" "}
        Se connecter ici
      </Link>
    </>
  );

  const submitButtonText = isLogin ? (
    <>
      <LogIn className="mr-2 h-4 w-4" /> Se connecter
    </>
  ) : (
    <>
      <Plus className="mr-2 h-4 w-4" /> Créer un compte
    </>
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const formSchema = z.object({
    email: z.string().email(emailNotValid),
    username: z
      .string({ required_error: usernameMinErrorMessage })
      .min(usernameMinLength, usernameMinErrorMessage)
      .max(usernameMaxLength, usernameMaxErrorMessage)
      .optional()
      .or(z.literal(""))
      .refine((username) => {
        return isLogin ? "xxxx" : username;
      }, usernameMinErrorMessage),

    password: z
      .string()
      .min(passwordMinLength, passwordMinErrorMessage)
      .max(passwordMaxLength, passwordMaxErrorMessage),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (isLogin) {
      await signIn("credentials", { ...values, redirect: false })
        .then((callback) => {
          console.log(callback);
          if (callback?.error) {
            toast.error(
              "La connexion a échoué. Veuillez vérifier votre email et votre mot de passe, et réessayer."
            );
          }
          if (callback?.ok && !callback.error) {
            toast.success(authLoginSuccessMessage);
            router.push("/");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const response = await fetchCustom("/auth/register", {
        body: JSON.stringify(values),
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        router.push("/login");
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={emailPlaceholder} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {!isLogin && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d&apos;utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder={usernamePlaceholder} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      autoComplete="false"
                      placeholder={passwordPlaceholder}
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    {showPassword ? (
                      <EyeOff
                        className="absolute bottom-0 right-2 top-0 my-auto cursor-pointer select-none text-muted-foreground"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Eye
                        className="absolute bottom-0 right-2 top-0 my-auto cursor-pointer select-none text-muted-foreground"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right text-sm italic">{helperText}</div>
          <Button
            type="submit"
            color="primary"
            isDisabled={loading || !isMounted}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
