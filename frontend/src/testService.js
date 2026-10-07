// services/ArticleService.js
/**
 * Сервисный слой с полной инъекцией зависимостей
 */
export class ArticleService {
    constructor(repository, validator, factory) {
        // Инъекция всех зависимостей
        this.repository = repository;
        this.validator = validator;
        this.factory = factory;
    }

    // Получить все статьи
    async getAllArticles() {
        try {
            const articles = await this.repository.findAll();
            return articles.map(article => this.factory.createDTOFromModel(article));
        } catch (error) {
            console.error('Ошибка при получении статей:', error);
            throw new Error('Не удалось получить статьи');
        }
    }

    // Получить статью по ID
    async getArticleById(id) {
        try {
            const article = await this.repository.findById(id);

            if (!article) {
                throw new Error('Статья не найдена');
            }

            return this.factory.createDTOFromModel(article);
        } catch (error) {
            console.error(`Ошибка при получении статьи ${id}:`, error);
            throw error;
        }
    }

    // Создать новую статью
    async createArticle(articleData) {
        try {
            // Используем инжектированный валидатор
            const validationResult = this.validator.validateCreate(articleData);

            if (!validationResult.isValid) {
                throw new Error(`Ошибка валидации: ${validationResult.errors.join(', ')}`);
            }

            // Используем инжектированную фабрику
            const articleDTO = this.factory.createFromRequest(articleData);

            // Сохранение в репозитории
            const createdArticle = await this.repository.create(articleDTO.getData());

            return this.factory.createDTOFromModel(createdArticle);
        } catch (error) {
            console.error('Ошибка при создании статьи:', error);
            throw error;
        }
    }

    // Обновить существующую статью
    async updateArticle(id, updateData) {
        try {
            // Проверяем существование статьи
            const existingArticle = await this.repository.findById(id);

            if (!existingArticle) {
                throw new Error('Статья не найдена');
            }

            // Используем инжектированный валидатор
            const validationResult = this.validator.validateUpdate(updateData);

            if (!validationResult.isValid) {
                throw new Error(`Ошибка валидации: ${validationResult.errors.join(', ')}`);
            }

            // Получаем текущий DTO через фабрику
            const existingDTO = this.factory.createDTOFromModel(existingArticle);

            // Создаем обновленный DTO через фабрику
            const updatedDTO = this.factory.updateFromRequest(existingDTO, updateData);

            // Обновляем в репозитории
            const updatedArticle = await this.repository.update(id, updatedDTO.getData());

            return this.factory.createDTOFromModel(updatedArticle);
        } catch (error) {
            console.error(`Ошибка при обновлении статьи ${id}:`, error);
            throw error;
        }
    }
}