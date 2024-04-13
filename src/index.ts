import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors({ origin: '*' }))
  .get("/", () => 'Default works!')
  .post('/purple', ({ body }) => {
    const { data } = body;
    if (!Array.isArray(data) || data.some(item => typeof item !== 'string')) {
      return { error: 'not a string from frontend' };
    }
    const poop = data[0];
    console.log('First element:', poop);
    return JSON.stringify(poop);
  }, { 
    body: t.Object({
      data: t.Array(t.String())
    })
  })
  .listen(3000);
