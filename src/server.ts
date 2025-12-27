import app from './app';
import 'dotenv/config'

const PORT = Number(process.env.APP_PORT);

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
