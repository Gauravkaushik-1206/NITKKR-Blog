import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { createBlogInput, updateBlogInput } from '@kaushik1206/blog-common';

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

    const { success } = createBlogInput.safeParse(body);
    if(!success){
        return c.json({
            message:'Invalid input',
            success:false
        })
    }

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

    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        return c.json({
            message:'Invalid input',
            success:false
        })
    }

    const updatedBlog = await prisma.post.update({
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


blog.get('/blog/bulk',async (c)=>{
    const prisma = getPrismaClient(c);
    const blogs = await prisma.post.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            published:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    
    return c.json({
        message:'Blogs',
        success:true,
        blogs
    });
})

blog.get('/blog/user',async (c)=>{
    const userId = c.get('userId');
    
    const prisma = getPrismaClient(c);
    const blogs = await prisma.post.findMany({
        where:{
            authorId:userId
        }
    });
    return c.json({
        message:'Blogs',
        success:true,
        blogs
    });
})

blog.get('/blog/:id',async (c)=>{
    const userId = c.get('userId');

    const prisma  = getPrismaClient(c);
    const id = c.req.param('id');

    const blog = await prisma.post.findUnique({
        where:{
            id:id,
        }
    })
    return c.json({
        message:'Blog fetch',
        success:true,
        blog
    });
})

export default blog;