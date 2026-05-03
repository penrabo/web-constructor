export const findElementById = (structure, targetId) => {
    // Если структура - массив, ищем в каждом элементе
    if (Array.isArray(structure)) {
        for (const item of structure) {
            const found = findElementById(item, targetId);
            if (found) return found;
        }
        return null;
    }

    // Если это объект
    if (structure && typeof structure === 'object') {
        // Проверяем сам элемент
        if (structure.id === targetId) {
            return structure;
        }

        // Ищем в детях
        if (structure.children && Array.isArray(structure.children)) {
            for (const child of structure.children) {
                const found = findElementById(child, targetId);
                if (found) return found;
            }
        }
    }

    return null;
};