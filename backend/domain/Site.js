// src/domain/Site.js
// СУЩНОСТЬ: Сайт. Данные + бизнес-правила.
// content — JSON-структура (объект), из которой React на клиенте собирает сайт.

class Site {
    constructor({ id, name, content, createdAt }) {
        this.id = id;
        this.name = name;
        this.content = content;       // объект, не строка
        this.createdAt = createdAt;
    }

    // Бизнес-правило: имя сайта не пустое и не длиннее 100 символов
    rename(newName) {
        if (!newName || newName.trim().length === 0) {
            throw new Error('Имя сайта не может быть пустым');
        }
        if (newName.length > 100) {
            throw new Error('Имя сайта слишком длинное');
        }
        this.name = newName;
    }

    // Бизнес-правило: content должен быть непустым объектом
    updateContent(newContent) {
        if (!newContent || typeof newContent !== 'object' || Array.isArray(newContent)) {
            throw new Error('content должен быть объектом');
        }
        if (Object.keys(newContent).length === 0) {
            throw new Error('content не может быть пустым');
        }
        this.content = newContent;
    }

    // Преобразование для API
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            content: this.content,
            createdAt: this.createdAt
        };
    }
}

module.exports = Site;