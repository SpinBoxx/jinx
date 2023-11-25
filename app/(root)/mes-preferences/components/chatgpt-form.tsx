"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { fetchCustom } from "@/lib/fetch-custom";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Meeting, User } from "@prisma/client";

interface Props {
  className?: string;
  user: User;
}
export const customModelChatGPTSchema = z.object({
  commentCustomModelChatGPT: z.string(),
});
const ChatGPTForm = ({ className, user }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof customModelChatGPTSchema>>({
    resolver: zodResolver(customModelChatGPTSchema),
    defaultValues: {
      commentCustomModelChatGPT: user.commentCustomModelChatGPT ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof customModelChatGPTSchema>) {
    setLoading(true);

    const response = await fetchCustom(`/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...values }),
    });
    const data: { userUpdated: Meeting; message: string } =
      await response.json();
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="commentCustomModelChatGPT"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modèle Chatgpt personnalisé</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    "Entrez le texte qui dira comment analiser les commentaires de vos réunions."
                  }
                  {...field}
                ></Textarea>
              </FormControl>
              <FormDescription>
                Le texte qui sera entré dans ce champ sera renvoyé
                automatiquement avec l&apos;export qui retourne tous les
                commentaires d&apos;une réunion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="default"
          className="w-full sm:ml-auto sm:flex sm:w-fit sm:px-10"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Modification en
              cours
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Modifier
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChatGPTForm;
