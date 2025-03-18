import { Hono } from 'hono'
import user from './routes/user.route'
import blog from './routes/blog.route';
import { verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: JWTPayload['id'];
    prisma: any;
  }
}>()

app.use('*',async (c,next)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    c.set('prisma',prisma);
    await next();
})

app.use(
  '/api/v1/*',
  cors({
    origin: 'http://localhost:5173',
    // allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    // allowMethods: ['POST', 'GET', 'OPTIONS'],
    // exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    // maxAge: 600,
    credentials: true,
  })
)

app.use('/api/v1/blog/*', async (c,next)=>{
  const header = c.req.header('authorization') || '';
  if(!header){
    return c.json({
      message:'Unauthorized',
      success:false
    })
  }

  const res = await verify(header.split(' ')[1], c.env.JWT_SECRET);
  // console.log(res);
  if(res){
    c.set("userId", res.id);
    await next();
  }
  else{
    c.status(401);
    return c.json({
      message:'Unauthorized',
      success:false
    })
  }
})

app.route('/api/v1/user', user);
app.route('/api/v1/', blog);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
