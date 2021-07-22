import { rest } from "msw";
import data from "@/results.json";

export default [
  rest.get("/airlines", (req, res, ctx) => {
    return res(ctx.json(data));
  }),
];
