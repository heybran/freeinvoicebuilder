import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/routes.ts"; // Import our router

const PORT = 3000;
const app = new Application();

app.use(router.routes()); 

app.use(async (context, next) => {
  try {
    // console.log(Object.keys(context));
    // [
    //   "app",      "cookies",
    //   "respond",  "request",
    //   "response", "state",
    //   "matched",  "router"
    // ]
    // console.log(context.request);
    // console.log(context.request);
    // const path = context.request.url.pathname;
    // const dirs = path.substring(1).split('/');
    await context.send({
      root: `${Deno.cwd()}/static`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

app.use(router.allowedMethods()); // Allow router HTTP methods

console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });