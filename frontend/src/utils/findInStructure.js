// frontend/src/utils/findInStructure.js

/**
 * Рекурсивно ищет элемент в структуре сайта по условию-предикату
 * @param {Object} structure - Корневой элемент структуры (объект с children)
 * @param {Function} predicate - Функция, принимающая элемент и возвращающая true/false
 * @returns {Object|null} Найденный элемент или null
 *
 * @example
 * // Поиск по id
 * const element = findInStructure(siteStructure, (item) => item.id === 'a7b3c9d2');
 *
 * @example
 * // Поиск по role
 * const bricksInner = findInStructure(siteStructure, (item) => item.role === 'bricks-inner');
 *
 * @example
 * // Комбинированный поиск (сначала находим блок по id, затем внутри него элемент по role)
 * const bricks = findInStructure(siteStructure, (item) => item.id === editingElementId);
 * const bricksInner = findInStructure(bricks, (item) => item.role === 'bricks-inner');
 */
export function findInStructure(structure, predicate) {
    if (!structure) return null;
    if (predicate(structure)) return structure;

    const items = structure.children || (Array.isArray(structure) ? structure : []);
    for (let i = 0; i < items.length; i++) {
        const element = findInStructure(items[i], predicate);
        if (element) return element;
    }

    return null;
}