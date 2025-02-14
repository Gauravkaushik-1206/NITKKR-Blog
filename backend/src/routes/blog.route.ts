import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
const blog = new Hono<{
    Variables:{
        userId:string;
    }
}>();

function getPrismaClient(c:any){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma;
}

blog.post('/blog',async (c)=>{
    const userId = c.get('userId');

    const body = await c.req.json();

    const prisma = getPrismaClient(c);

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId : userId
        }
    })



    return c.json({
        message:'Blog created',
        success:true,
        blog
    });
})

blog.put('/blog',async (c)=>{
    const userId = c.get('userId');

    const prisma  = getPrismaClient(c);
    const body = await c.req.json();

    const updatedBlog = prisma.post.update({
        where:{
            id:body.id,
            authorId:userId
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.json({
        message:'Blog updated',
        success:true,
        updatedBlog
    });
})

blog.get('/blog/:id',async (c)=>{
    const userId = c.get('userId');

    const prisma  = getPrismaClient(c);
    const id = c.req.param('id');

    const blog = prisma.post.findUnique({
        where:{
            id:id,
        }
    })
    return c.json({
        message:'Blog fetched',
        success:true,
        blog
    });
})

blog.get('/blog/bulk',(c)=>{
    const prisma = getPrismaClient(c);
    const blogs = prisma.post.find({});
    return c.json({
        message:'Blogs fetched',
        success:true,
        blogs
    });
})

blog.get('/blog/user',(c)=>{
    const userId = c.get('userId');

    const prisma = getPrismaClient(c);
    const blogs = prisma.post.findMany({
        where:{
            authorId:userId
        }
    });
    return c.json({
        message:'Blogs fetched',
        success:true,
        blogs
    });
})

export default blog;