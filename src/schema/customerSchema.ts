import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const purchaseSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.string().email(),
});

export default purchaseSchema;
