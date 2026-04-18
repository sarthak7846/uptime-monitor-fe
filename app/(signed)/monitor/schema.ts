import {z} from 'zod';

export const createMonitorSchema = z.object({
    name: z.string().optional(),
    url: z.string(),
    method: z.enum(["GET", "POST", "HEAD"]),
    lastStatus: z.preprocess(
      (val) => (val === "" || val == null ? undefined : val),
      z.enum(["PENDING", "UP", "DOWN"]).optional()
    ),
    interval: z.coerce.number().min(5),
    timeout: z.coerce.number().min(1),
  });