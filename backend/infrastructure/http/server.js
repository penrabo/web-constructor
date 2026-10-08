// server.js

const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const cors = require("cors");
const path = require("path");
const { promises: fs } = require("fs");
const pool = require("../../db");
const createSiteRoutes = require('./routes/siteRoutes');

function createServer() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Статика
    app.use('/templates', express.static(path.join(__dirname, '../../templates')));
    app.use('/gallery', express.static(path.join(__dirname, '../../gallery')));

    // Шаблон 1
    app.get('/api/templates/template1', async (req, res) => {
        try {
            const templatePath = path.join(__dirname, '../../templates', 'template1', 'structure.json');
            const data = await fs.readFile(templatePath, 'utf8');
            res.json(JSON.parse(data));
        } catch (error) {
            res.status(500).json({ error: 'Шаблон не найден' });
        }
    });

    // Шаблон 2
    app.get('/api/templates/template2', async (req, res) => {
        try {
            const templatePath = path.join(__dirname, '../../templates', 'template2', 'structure.json');
            const data = await fs.readFile(templatePath, 'utf8');
            res.json(JSON.parse(data));
        } catch (error) {
            res.status(500).json({ error: 'Шаблон не найден' });
        }
    });

    // Галерея
    app.get('/api/gallery', async (req, res) => {
        try {
            const galleryPath = path.join(__dirname, '../../gallery');
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

// Сохранение сайта
    app.use('/api/save', createSiteRoutes());

    // Загрузка сайта по id
    app.get('/api/site/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM sites WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Сайт не найден' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка загрузки' });
        }
    });

    app.use(errorHandler);

    return app;
}

module.exports = createServer;