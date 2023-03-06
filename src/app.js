const express = require('express');

const app = express();
app.use(express.json());
const blogsRoutes = express.Router();
const { loginRouter, userRouter, categoryRouter } = require('./routes');

// ...

blogsRoutes.use('/login', loginRouter);
blogsRoutes.use('/user', userRouter);
blogsRoutes.use('/categories', categoryRouter);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// ...
app.use(blogsRoutes);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
