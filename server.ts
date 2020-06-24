import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './routes.ts';

const port = 5000;

const app = new Application();


console.log(`Server running on port ${port}`);

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({port});
