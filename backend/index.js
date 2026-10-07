// index.js
const createServer = require('./infrastructure/http/server');
const PORT = 5000;
const app = createServer();
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});