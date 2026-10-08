// src/infrastructure/http/routes/siteRoutes.js
// РОУТЫ: маппинг URL на контроллеры

const express = require('express');
const siteController = require('../controllers/siteController');

function createSiteRoutes(siteService) {
    const router = express.Router();
    const controller = new siteController(siteService);

    router.post('/:id', (req, res, next) => controller.save(req, res, next));

    // Роут для получения информации о пользователе
    // router.get('/:id', (req, res, next) => controller.getUser(req, res, next));

    return router;
}

module.exports = createSiteRoutes;