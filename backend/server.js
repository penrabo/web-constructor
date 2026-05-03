const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/templates', express.static(path.join(__dirname, 'templates')));
app.use('/gallery', express.static(path.join(__dirname, 'gallery')));

// Ендпоинт для получения шаблона
app.get('/api/templates/template1', async (req, res) => {
    try {
        const templatePath = path.join(__dirname, 'templates', 'template1', 'structure.json');
        const data = await fs.readFile(templatePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Шаблон не найден' });
    }
});
app.get('/api/templates/template2', async (req, res) => {
    try {
        const templatePath = path.join(__dirname, 'templates', 'template2', 'structure.json');
        const data = await fs.readFile(templatePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Шаблон не найден' });
    }
});

app.get('/api/gallery', async (req, res) => {
    try {
        const galleryPath = path.join(__dirname, 'gallery');
        const files = await fs.readdir(galleryPath);

        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => ({
                url: `http://localhost:5000/gallery/${file}`,
                filename: file
            }));

        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось загрузить галерею' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});