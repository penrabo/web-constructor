// src/infrastructure/database/repositories/SiteRepository.js
// РЕПОЗИТОРИЙ: доступ к БД. Возвращает и принимает доменные объекты Site.
// Пока без ORM — внутри заглушки, куда потом вставишь реальные SQL-запросы.
// content в БД хранится как JSON (jsonb в Postgres, JSON в MySQL, TEXT с JSON.parse в SQLite — как у тебя настроено).

const Site = require('../../../domain/Site');

class SiteRepository {
    // Найти сайт по id. Возвращает Site или null.
    async findById(id) {
        // TODO: реальный запрос к БД
        // const row = await db.query('SELECT * FROM sites WHERE id = ?', [id]);
        // if (!row) return null;
        // return this._toDomain(row);

        throw new Error('SiteRepository.findById не реализован');
    }

    // Сохранить сайт. Принимает Site. Если id есть — обновить, если нет — создать.
    // Возвращает сохранённый Site (с присвоенным id, если был insert).
    async save(site) {
        // TODO: реальный запрос к БД
        // if (site.id) {
        //     await db.query('UPDATE sites SET name = ?, content = ? WHERE id = ?',
        //         [site.name, JSON.stringify(site.content), site.id]);
        //     return site;
        // } else {
        //     const result = await db.query('INSERT INTO sites (name, content, created_at) VALUES (?, ?, ?)',
        //         [site.name, JSON.stringify(site.content), site.createdAt]);
        //     site.id = result.insertId;
        //     return site;
        // }

        throw new Error('SiteRepository.save не реализован');
    }

    // Приватный маппер: строка из БД → Site (домен)
    _toDomain(row) {
        return new Site({
            id: row.id,
            name: row.name,
            // Если драйвер БД сам парсит JSON (например, pg для jsonb) — оставляй как есть.
            // Если колонка TEXT — раскомментируй JSON.parse.
            content: typeof row.content === 'string' ? JSON.parse(row.content) : row.content,
            createdAt: row.created_at
        });
    }

    // Приватный маппер: Site (домен) → объект для записи в БД
    _toPersistence(site) {
        return {
            id: site.id,
            name: site.name,
            // Если драйвер сам сериализует JSON — оставь site.content.
            // Если колонка TEXT — JSON.stringify(site.content).
            content: JSON.stringify(site.content),
            created_at: site.createdAt
        };
    }
}

module.exports = SiteRepository;