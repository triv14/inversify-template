import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const purchaseSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  customerId: z.string().uuid(),
  date: z.coerce.date(),
  total: z.coerce.number(),
});

export default purchaseSchema;
