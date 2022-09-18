import { Application, send } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/routes.ts"; // Import our router

const PORT = 3000;
const app = new Application();

app.use(router.routes()); // Implement our router
app.use(router.allowedMethods()); // Allow router HTTP methods

router.get('/:slug*', async (ctx, next) => {
  try {
    const path = ctx.request.url.pathname; // /components/test.html
    await send(ctx, path, {
      root: `${Deno.cwd()}/public`,
      index: 'index.html'
    });
    
  } catch {
    await next();
  }
});

console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });