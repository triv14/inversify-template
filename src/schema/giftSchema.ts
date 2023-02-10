import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const giftSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  customerId: z.string().uuid(),
  description: z.string(),
});

export default giftSchema;
