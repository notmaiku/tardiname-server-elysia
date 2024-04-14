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
    let answerTallys = new Map<string, number>();
    answerTallys.set("A", 0);
    answerTallys.set("B", 0);
    answerTallys.set("C", 0);

    let currAnswer: string = "";
    var name: string  = data[data.length - 1]
    var newName: string  = ""

    for (let i = 0; i < data.length - 1; i++) {
      currAnswer = Array.from(data[i])[0];
      if (answerTallys.has(currAnswer)) {
        let prevTally = answerTallys.get(currAnswer);
        if (prevTally !== undefined) {
          answerTallys.set(currAnswer, prevTally + 1);
        }
      }
    }

    var maxChoice: string  = ""
    var maxAnswer = 0

    for (let [key, value] of answerTallys) {
      if(value > maxAnswer){
        maxAnswer = value
        maxChoice = key
      }
    }

    var midOfName = name.length / 2
    name = name.substring(midOfName)

    if(maxChoice === "A"){
      newName = "Wuh" + name
    }else if(maxChoice === "B"){
      newName = "Wal" + name
    }else{
      newName = "Wish" + name
    }

    console.log("new name =  ", newName)
    return JSON.stringify(newName)
  }, {
    body: t.Object({
      data: t.Array(t.String())
    })
  })
  .listen(3000);
