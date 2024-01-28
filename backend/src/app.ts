import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';
import { connect } from './typeorm-config';

import userRouter from './user/user.router';
import loginRouter from './login/login.router';
import tagRouter from './tag/tag.router';
import categoryRouter from './category/category.router';
import noteRouter from './note/note.router';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(json());

app.use('/api/v1/users', userRouter)
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/tags', tagRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/notes', noteRouter)

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch(err => console.log('Error connecting to database:', err));

