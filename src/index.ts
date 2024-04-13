import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors({ origin: 'Any' }))
  .get("/", () => 'Default works!')
  .post('/purple', ({ body }) => `Answered ${body.data[0].answer}`, {
    body: t.Object({
      data: t.Array(t.Object({ answer: t.String() }))
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
