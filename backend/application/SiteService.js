// src/application/SiteService.js
// СЕРВИС: сценарии использования для сайта.

const Site = require('../domain/Site');

class SiteService {
    constructor(siteRepository) {
        this.siteRepository = siteRepository;
    }

    // СЦЕНАРИЙ: сохранить сайт (создать или обновить)
    async saveSite({ id, name, content }) {
        // Если id есть — грузим существующий и меняем через домен
        if (id) {
            const site = await this.siteRepository.findById(id);
            if (!site) {
                throw new Error('Сайт не найден');
            }
            site.rename(name);
            site.updateContent(content);
            const saved = await this.siteRepository.save(site);
            return saved.toJSON();
        }

        // Если id нет — создаём новый
        const site = new Site({
            id: null,
            name,
            content,
            createdAt: new Date()
        });

        // Прогоняем через доменные правила, чтобы невалидное не попало в БД.
        // Конструктор просто присваивает, правила — в методах.
        site.rename(name);
        site.updateContent(content);

        const saved = await this.siteRepository.save(site);
        return saved.toJSON();
    }

    // СЦЕНАРИЙ: загрузить сайт по id
    async loadSite(id) {
        const site = await this.siteRepository.findById(id);
        if (!site) {
            throw new Error('Сайт не найден');
        }
        return site.toJSON();
    }
}

module.exports = SiteService;