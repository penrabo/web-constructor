// frontend/src/utils/addElement.js
import { useStore } from '../store/useStore';
import { findInStructure } from './findInStructure';
import { BLOCK_TEMPLATES } from '../templates/blockTemplates.js';

const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10);
};

const generateIdsRecursively = (element) => {
    element.id = generateRandomId();

    if (element.children && Array.isArray(element.children)) {
        element.children.forEach(child => generateIdsRecursively(child));
    }
};

/**
 * Добавляет новый элемент в структуру
 * @param {string} parentId - ID родительского элемента
 * @param {string} blockName - имя блока в BLOCK_TEMPLATES (например, 'bricksCard')
 * @param {string|null} targetRole - роль контейнера, в который добавляем (если null, добавляем напрямую в children parentId)
 * @returns {void}
 *
 * @example
 * // Добавить карточку в bricks-inner
 * addElement('b9a4c7e1', 'bricksCard', 'bricks-inner');
 *
 * @example
 * // Добавить элемент напрямую в children секции
 * addElement('a7b3c9d2', 'someBlock', null);
 */
export const addElement = (parentId, blockName, targetRole = null) => {
    const { siteStructure, setSiteStructure } = useStore.getState();
    const copy = JSON.parse(JSON.stringify(siteStructure));

    const parent = findInStructure(copy, (item) => item.id === parentId);
    if (!parent) return;

    let container = parent;
    if (targetRole) {
        container = findInStructure(parent, (item) => item.role === targetRole);
        if (!container) return;
    }

    if (!container.children || !Array.isArray(container.children)) return;

    const template = BLOCK_TEMPLATES[blockName];
    if (!template) return;

    const newElement = JSON.parse(JSON.stringify(template));
    generateIdsRecursively(newElement);

    container.children.push(newElement);
    setSiteStructure(copy);
};