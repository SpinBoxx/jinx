import { auth } from "@/auth";
import { Image } from "@nextui-org/react";
import TabsComponents from "./components/tabs";

const MyProfilPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-y-3">
        <Image
          width={150}
          height={150}
          className="aspect-square rounded-full"
          alt="NextUI hero Image"
          src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
        <p className="text-2xl font-semibold">{session?.user?.username}</p>
        <p className="text-sm text-foreground">{session?.user?.email}</p>
      </div>
      <div className="mt-16 flex flex-col justify-center">
        <TabsComponents className="!block w-full" />
      </div>
    </div>
  );
};

export default MyProfilPage;
