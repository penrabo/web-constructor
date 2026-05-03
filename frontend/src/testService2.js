// services/ArticleService.js
import { ArticleRepository } from '../repositories/ArticleRepository.js';
import { ArticleValidator } from '../validators/ArticleValidator.js';
import { ArticleFactory } from '../factories/ArticleFactory.js';
import { ArticleDTO } from '../dto/ArticleDTO.js';

/**
 * Сервисный слой для бизнес-логики приложения
 * Координирует работу между репозиторием, валидатором и фабрикой
 */
export class ArticleService {
    constructor(repository) {
        // Инъекция зависимости через конструктор
        this.repository = repository || new ArticleRepository();
    }

    // Получить все статьи
    async getAllArticles() {
        try {
            const articles = await this.repository.findAll();
            return articles.map(article => ArticleDTO.fromModel(article));
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

            return ArticleDTO.fromModel(article);
        } catch (error) {
            console.error(`Ошибка при получении статьи ${id}:`, error);
            throw error;
        }
    }

    // Создать новую статью
    async createArticle(articleData) {
        try {
            // Валидация входных данных
            const validationResult = ArticleValidator.validateCreate(articleData);

            if (!validationResult.isValid) {
                throw new Error(`Ошибка валидации: ${validationResult.errors.join(', ')}`);
            }

            // Создание DTO через фабрику с применением бизнес-правил
            const articleDTO = ArticleFactory.createFromRequest(articleData);

            // Сохранение в репозитории
            const createdArticle = await this.repository.create(articleDTO.getData());

            return ArticleDTO.fromModel(createdArticle);
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

            // Валидация обновлений
            const validationResult = ArticleValidator.validateUpdate(updateData);

            if (!validationResult.isValid) {
                throw new Error(`Ошибка валидации: ${validationResult.errors.join(', ')}`);
            }

            // Получаем текущий DTO
            const existingDTO = ArticleDTO.fromModel(existingArticle);

            // Создаем обновленный DTO через фабрику
            const updatedDTO = ArticleFactory.updateFromRequest(existingDTO, updateData);

            // Обновляем в репозитории
            const updatedArticle = await this.repository.update(id, updatedDTO.getData());

            return ArticleDTO.fromModel(updatedArticle);
        } catch (error) {
            console.error(`Ошибка при обновлении статьи ${id}:`, error);
            throw error;
        }
    }
}