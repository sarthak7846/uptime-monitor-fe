import { z } from "zod";

export const createStatusPageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.preprocess(
    (val) => (val === "" || val == null ? undefined : val),
    z.string().optional()
  ),
  monitorIds: z.preprocess(
    (val) => {
      if (val === "" || val == null) return undefined;
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return val.split(",").filter(Boolean);
        }
      }
      return val;
    },
    z.array(z.string().uuid()).optional()
  ),
});
