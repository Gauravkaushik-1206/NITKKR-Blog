import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const user = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

function getPrismaClient(c:any){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma;
}

user.post('/signup',async (c)=>{
    //it is initialsed inside the route not globally 
    // because might be the serverless deploy route independently
    //we can't have env variable globally

    //  As their are many backened distribute over all world
    // that's why we make connection pool for databse becuase postgre does have limited connection
    // so we make connection pool to manage the connection
    // const prisma = new PrismaClient({
    //     datasourceUrl: c.env.DATABASE_URL,
    // }).$extends(withAccelerate())
    const prisma = getPrismaClient(c);

    const body  = await c.req.json();

    try{
        const user = await prisma.user.create({
            data:{
                email:body.email,
                password:body.password
            }
        })

        const payload = {
            id:user.id,
            exp:Date.now() + 1000 * 60 * 60 * 5,
        }

        const jwt_token = await sign(payload,c.env.JWT_SECRET);

        return c.json({jwt_token});

    } catch(e){
        console.log(e);
        c.status(403);
    }

    // console.log(res);

    // return c.json({message:'User signed up'});
})

user.post('/signin',(c)=>{
    return c.json({message:'User signed in'});
})

export default user;