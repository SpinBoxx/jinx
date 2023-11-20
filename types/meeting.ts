import { z } from "zod";

export const meetingTitleMinLength = 2;
export const meetingTitleMaxLength = 50;
export const meetingTitleMinErrorMessage = `Le titre de la réunion doit faire au mininum ${meetingTitleMinLength} caractères`;
export const meetingTitleMaxErrorMessage = `Le titre de la réunion doit faire au maximum ${meetingTitleMaxLength} caractères`;
export const meetingTitlePlaceholder =
  "Veuillez entrer le titre de la réunion ici...";

export const meetingDescriptionMinLength = 10;
export const meetingDescriptionMaxLength = 1000;
export const meetingDescriptionMinErrorMessage = `La description de la réunion doit faire au mininum ${meetingDescriptionMinLength} caractères`;
export const meetingDescriptionMaxErrorMessage = `La description de la réunion doit faire au maximum ${meetingDescriptionMaxLength} caractères`;
export const meetingDescriptionPlaceholder =
  "Veuillez entrer la description de la réunion ici...";

export const meetingPartipantsPlaceholder =
  "Nombre de participants à la réunion";

export const meetingSchema = z.object({
  title: z
    .string()
    .min(meetingTitleMinLength, meetingTitleMinErrorMessage)
    .max(meetingTitleMaxLength, meetingTitleMaxErrorMessage),
  description: z
    .string()
    .min(meetingDescriptionMinLength, meetingDescriptionMinErrorMessage)
    .max(meetingDescriptionMaxLength, meetingDescriptionMaxErrorMessage),
  participants: z.coerce.number().min(0),
  when: z.coerce.date(),
  hours: z.coerce.number().min(0).max(24),
  minutes: z.coerce.number().min(0).max(59),
});

// CONST FOR MEETING VOTE

export const meetingVoteMinValue = 0;
export const meetingVoteMaxValue = 10;
export const meetingVoteStepValue = 1;
export const meetingVoteSchema = z.object({
  note: z.number().min(meetingVoteMinValue).max(meetingVoteMaxValue),
});
