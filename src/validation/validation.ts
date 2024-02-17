import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  author: z.string().nonempty("Author is required"),
  urlToImage: z.string().url("Invalid image URL"),
});
