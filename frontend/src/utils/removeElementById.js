/**
 * Иммутабельно удаляет элемент из структуры по ID
 * @param {Object|Array} structure - структура данных
 * @param {string} targetId - ID удаляемого элемента
 * @returns {Object|Array} - новая структура без удаленного элемента
 */
export function removeElementById(structure, targetId) {
    // Создаем глубокую копию структуры
    const copy = JSON.parse(JSON.stringify(structure));

    // Рекурсивно удаляем элемент по ID
    function deleteFromStructure(node) {
        if (!node || typeof node !== 'object') return;

        // Если это массив - проверяем каждый элемент
        if (Array.isArray(node)) {
            for (let i = node.length - 1; i >= 0; i--) {
                if (node[i]?.id === targetId) {
                    node.splice(i, 1);
                } else {
                    deleteFromStructure(node[i]);
                }
            }
            return;
        }

        // Если это объект с детьми - рекурсивно обрабатываем их
        if (node.children && Array.isArray(node.children)) {
            deleteFromStructure(node.children);
        }
    }

    deleteFromStructure(copy);
    return copy;
}