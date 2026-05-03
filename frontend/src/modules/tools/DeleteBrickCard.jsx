import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { removeElementById } from "../../utils/removeElementById.js";

const DeleteBricksCard = () => {

    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);
    const setSiteStructure = useStore((state) => state.setSiteStructure);

    useEffect(() => {

        // Проверяем, активен ли наш инструмент
        if (activeTools.includes('deleteBrickCard')) {

            // Находим карточку по ID и удаляем, возвращая новую структуру
            const newStructure = removeElementById(siteStructure, editingSubElementId);
            setSiteStructure(newStructure);
            removeActiveTool('deleteBrickCard');
        }

    }, [activeTools]);

    return (<></>);
};

export default DeleteBricksCard;