import { z } from "zod";
import { ZOD_REQUIRED_ERR } from "../../config/constants.js";

const uploadOfferZodSchema = z.object({
  body: z.object({
    name: z.string(ZOD_REQUIRED_ERR.replace("{field}", "name")),
    valueProps: z.array(z.string().nonempty("At one value prop is required")),
    idealUseCases: z.array(
      z.string().nonempty("At one value prop is required")
    ),
  }),
});

export { uploadOfferZodSchema };
