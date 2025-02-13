import { Hono } from 'hono'
import user from './routes/user.route'

const app = new Hono()

app.route('/api/v1/user', user);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
