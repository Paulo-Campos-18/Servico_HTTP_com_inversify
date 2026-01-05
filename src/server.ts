import app from './app';


const PORT = Number(process.env.APP_PORT);


app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});

