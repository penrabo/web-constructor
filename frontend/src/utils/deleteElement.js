// frontend/src/utils/deleteElement.js
import { useStore } from '../store/useStore';
import { removeElementById } from './removeElementById';

/**
 * Удаляет элемент из глобальной структуры сайта по его ID
 * @param {string} elementId - ID элемента, который нужно удалить
 * @returns {void}
 *
 * @example
 * // Удалить карточку
 * deleteElement('card123');
 *
 */
export const deleteElement = (elementId) => {
    const { siteStructure, setSiteStructure } = useStore.getState();
    const newStructure = removeElementById(siteStructure, elementId);
    setSiteStructure(newStructure);
};