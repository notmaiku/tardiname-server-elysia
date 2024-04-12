import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .get("/", () => 'Default works!')
  .post('purple', ({ body: { answer } }) => `Answered ${answer}`, {
    body: t.Object({
      answer: t.String()
    })
  })
  .use(cors({ origin: '*' }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
