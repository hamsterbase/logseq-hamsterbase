import { HamsterBase } from "@hamsterbase/sdk";

const hamsterbase = new HamsterBase({
  endpoint: "endpoint",
  token: "token",
  requestLib: fetch,
});

console.log(hamsterbase);
