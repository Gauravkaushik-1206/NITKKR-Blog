import { Hono } from 'hono';
const blog = new Hono();

blog.post('/blog',(c)=>{
    return c.json({message:'Blog created'});
})

blog.put('/blog',(c)=>{
    return c.json({message:'Blog updated'});
})

blog.get('/blog/:id',(c)=>{
    return c.json({message:'Blog fetched'});
})

blog.get('/blog/bulk',(c)=>{
    return c.json({message:'Blogs fetched'});
})