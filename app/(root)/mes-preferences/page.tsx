import Header from "@/components/header";
import { Divider } from "@nextui-org/react";
import ChatGPTForm from "./components/chatgpt-form";
import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { signOut } from "next-auth/react";

const MyPreferencesPage = async () => {
  const session = await auth();

  const user = await prismadb.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) return signOut();

  return (
    <div>
      <Header
        data={{
          title: "Les préférences du compte",
          description:
            "Dans cette page, vous retrouverez tous les paramètres qui sont configurables sur Jinx. Comme les modèles par defaut de ChatGPT pour les exports de commentaires.",
        }}
      />
      <Divider className="my-4" />
      <ChatGPTForm user={user} />
    </div>
  );
};

export default MyPreferencesPage;
