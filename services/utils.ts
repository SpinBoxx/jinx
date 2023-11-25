import { fromUnixTime } from "date-fns";
import { ZodError } from "zod";

export const zodCheckParse = (data: { success: boolean; error?: ZodError }) => {
  if (data.success) return { success: true };

  const property = data.error?.errors.at(0)?.path.at(0);
  const errorMessage = data.error?.errors.at(0)?.message;
  const formattedError = `${capitalizeFirstLetter(
    property?.toString()
  )} ${errorMessage}`;
  return { success: false, error: formattedError };
};

function capitalizeFirstLetter(text?: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const getDatetimeFromTimestamp = (timestamp: number) => {
  // J'enleve - 10s pour que quand j'envoie un message et que je le recois en instane => now() === creationDatetime donc pour fns il est dans le futur (suffixe dans au lieu de il y a)
  return fromUnixTime(timestamp / 1000 - 10);
};
