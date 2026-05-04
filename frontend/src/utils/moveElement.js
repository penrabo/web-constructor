// frontend/src/utils/moveElement.js
import { useStore } from '../store/useStore';
import { findInStructure } from './findInStructure';

/**
 * Перемещает элемент на одну позицию вверх или вниз
 * @param {string} parentId - ID родительского элемента, внутри которого нужно двигать
 * @param {number} index - текущий индекс перемещаемого элемента
 * @param {string} direction - направление: 'up' или 'down'
 * @param {string|null} targetRole - роль контейнера, внутри которого двигаем (если null, двигаем среди прямых детей parentId)
 * @returns {void}
 *
 * @example
 * // Переместить карточку вверх
 * moveElement('b9a4c7e1', 2, 'up', 'bricks-inner');
 *
 * @example
 * // Переместить элемент вниз
 * moveElement('b9a4c7e1', 0, 'down', 'bricks-inner');
 */
export const moveElement = (parentId, index, direction, targetRole = null) => {
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

    if (direction === 'up' && index > 0) {
        [container.children[index - 1], container.children[index]] =
            [container.children[index], container.children[index - 1]];
    }

    if (direction === 'down' && index < container.children.length - 1) {
        [container.children[index + 1], container.children[index]] =
            [container.children[index], container.children[index + 1]];
    }

    setSiteStructure(copy);
};