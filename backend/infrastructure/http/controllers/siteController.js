// src/infrastructure/http/controllers/siteController.js
// КОНТРОЛЛЕР: обрабатывает HTTP-запросы для Site

const pool = require("../../../db");

class SiteController {
    //constructor(siteService) {
        // this.userService = userService;
    //}

    async save(req, res, next) {
        const { name, structure } = req.body;
        const userId = parseInt(req.params.id);
        try {
            const result = await pool.query(
                `INSERT INTO sites (id, name, structure)
             VALUES (${userId}, $1, $2)
             ON CONFLICT (id) DO UPDATE
             SET name = $1, structure = $2
             RETURNING id`,
                [name, structure]
            );
            res.json({ success: true, id: result.rows[0].id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка сохранения' });
        }
    }
}

module.exports = SiteController;