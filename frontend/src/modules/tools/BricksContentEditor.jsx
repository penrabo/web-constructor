import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { findElementById } from '../../utils/findElementById';
import TextEdit from "./features/TextEdit.jsx";

const BricksContentEditor = ({ isOpen }) => {
    const [contentValue, setContentValue] = useState('');

    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);
    const setSiteStructure = useStore((state) => state.setSiteStructure);

    const loadContent = () => {
        const card = findElementById(siteStructure, editingSubElementId);
        const contentElement = card?.children?.find(child => child.class === 'item-content');
        console.log('contentElement.content' + contentElement.content);
        return contentElement?.content || '';
    };
    const updateContent = (newContent) => {
        // Создаем глубокую копию структуры
        const newStructure = JSON.parse(JSON.stringify(siteStructure));
        const card = findElementById(newStructure, editingSubElementId);
        const contentElement = card?.children?.find(child => child.class === 'item-content');
        contentElement.content = newContent;
        // Обновляем структуру в сторе
        setSiteStructure(newStructure);
    };

    useEffect(() => {
        if (isOpen) {
            setContentValue(loadContent());
        } else {
            // очистка при закрытии диалога
            setContentValue('');
        }
    }, [isOpen]);

    const handleSave = (newContent) => {
        updateContent(newContent);

        // Закрываем инструмент
        removeActiveTool('bricksContentEditor');
    };

    const handleClose = () => {
        removeActiveTool('bricksContentEditor');
    };

    if (!isOpen) return null;

    return (
        <TextEdit dialogTitle={'Редактировать текст'} isOpen={isOpen} isMultiline={true} initialValue={contentValue} handleClose={handleClose} handleSave={handleSave}/>
    );
};

export default BricksContentEditor;