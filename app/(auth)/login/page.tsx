import { Separator } from "@/components/ui/separator";
import AuthForm from "../components/auth-form";
import { Metadata } from "next";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Se connecter",
};

const LoginPage = async () => {
  return (
    <div className="flex h-full flex-col items-center justify-center ">
      <div className="flex w-fit flex-col items-center justify-center rounded-md bg-gradient-to-tr from-gray-50 to-neutral-50 px-10 py-14 shadow">
        <div>
          <Image alt="Jinx logo" width={70} height={70} src="/logo.png" />
        </div>
        <Separator className="my-5 w-1/2" />
        <div className="flex flex-col">
          <span className="text-center text-2xl  font-bold">Se connecter</span>
          <span className="mt-3 text-center text-sm  text-muted-foreground">
            Entrez votre email et votre mot de passe ci-dessous puis cliquez sur
            le bouton `&quot;Se connecter`&quot;
          </span>

          <AuthForm className="mt-6 w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
