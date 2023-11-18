"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import FR from "date-fns/locale/fr";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  meetingTitlePlaceholder,
  meetingDescriptionPlaceholder,
  meetingPartipantsPlaceholder,
  meetingSchema,
} from "@/types/meeting";
import { useState } from "react";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { fetchCustom } from "@/lib/fetch-custom";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useShareMeetingLink } from "@/hooks/use-share-meeting-link";
import { Meeting } from "@prisma/client";

interface Props {
  className: string;
}

const FormAddMeeting = ({ className }: Props) => {
  const [loading, setLoading] = useState(false);
  const formSchema = meetingSchema;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { setShareLink, shareLink, toggleModalOpen } = useShareMeetingLink();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { when, hours, minutes } = values;

    when.setHours(hours);
    when.setMinutes(minutes);
    console.log(when);

    const response = await fetchCustom("/meeting", {
      method: "POST",
      body: JSON.stringify({ ...values, when: new Date(when) }),
    });
    const data: { meeting: Meeting; message: string } = await response.json();
    if (response.ok) {
      toast.success(data.message);
      setShareLink(data.meeting.shareLink);
      toggleModalOpen();
      // router.push("/");
    } else {
      toast.error(data.message);
    }
    setLoading(false);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder={meetingTitlePlaceholder} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={meetingDescriptionPlaceholder}
                  {...field}
                ></Textarea>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <FormField
            control={form.control}
            name="when"
            render={({ field }) => (
              <FormItem className="col-span-2 mt-1.5 self-start">
                <div className="flex w-full flex-col space-y-3">
                  <FormLabel>Date de début</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: FR })
                          ) : (
                            <span>Choisi une date de début</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Heure" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minutes</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Minutes" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partipants à la réunion</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={meetingPartipantsPlaceholder}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={toggleModalOpen}>
          fe
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="w-full sm:ml-auto sm:flex sm:w-fit sm:px-10"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Création en
              cours
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> Ajouter
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormAddMeeting;
