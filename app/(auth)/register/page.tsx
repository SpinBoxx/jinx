import { Separator } from "@/components/ui/separator";
import AuthForm from "../components/auth-form";
import { Metadata } from "next";

import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Créer un compte",
};

const RegisterPage = async () => {
  // const session = await getSession();
  // if (session?.user?.email) {
  //   redirect("/");
  // }
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-fit flex-col items-center justify-center rounded-md bg-gradient-to-tr from-gray-50 to-neutral-50 px-10  py-14 shadow">
        <div>
          <Image alt="Jinx logo" width={70} height={70} src="/logo.png" />
        </div>
        <Separator className="my-5 w-1/2" />
        <div className="flex max-w-xl flex-col">
          <span className="text-center text-2xl  font-bold">
            Créer un compte
          </span>
          <span className="mt-3 text-center text-sm  text-muted-foreground">
            Entrez votre email, votre nom d&apos;utilisateur votre mot de passe
            ci-dessous puis cliquez sur le bouton &quot;Créer un compte&quot;
          </span>

          <AuthForm className="mt-6 w-full" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
