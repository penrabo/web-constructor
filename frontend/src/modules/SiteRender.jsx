import React from 'react';
import { useStore } from '../store/useStore';
import { Box } from '@mui/material';
import ToolActivator from './ToolActivator.jsx';

const SiteRender = () => {
    const siteStructure = useStore((state) => state.siteStructure);

    const buildSite = (elementData) => {
        // Если нет данных, ничего не рендерим
        if (!elementData) return null;

        let children = [];

        // Рекурсивно обрабатываем дочерние элементы
        if (elementData.children && Array.isArray(elementData.children)) {
            children = elementData.children.map((child) => buildSite(child));
        }

        // Если есть контент (текст), используем его вместо детей
        if (elementData.content !== null && elementData.content !== undefined) {
            children = elementData.content;
        }

        // Создаем пропсы для элемента
        const elementProps = {
            key: elementData.id || Math.random(),
            id: elementData.id,
            className: elementData.class || '',
            style: elementData.style || {},
        };

        // если у элемента может быть фоновое изображение
        if (elementData.backgroundImage !== null && elementData.backgroundImage !== undefined) {
            elementProps.backgroundImage = elementData.backgroundImage;
        }

        // Если у элемента есть builderTool, добавляем иконку редактирования
        if (elementData.builderTool) {
            // Оборачиваем элемент в Box с относительным позиционированием
            // чтобы иконка была в углу
            return (
                <Box
                    key={`${elementData.id}-wrapper`}
                    sx={{ position: 'relative', display: 'inline-block', width: '100%' }}
                >
                    {/* Иконка редактирования в правом верхнем углу */}
                    <ToolActivator
                        builderTool={elementData.builderTool}
                        elementId={elementData.id}
                    />

                    {/* Сам элемент */}
                    {React.createElement(
                        elementData.type,
                    {
                        ...elementProps,
                        style: {
                        ...elementProps.style,
                            backgroundImage: `url(${elementData.backgroundImage})`
                    }
                    },
                        children
                        )}
                </Box>
            );
        }

        // Обычный элемент без иконки
        return React.createElement(
            elementData.type,
            {
                ...elementProps,
                style: {
                    ...elementProps.style,
                    backgroundImage: `url(${elementData.backgroundImage})`
                }
            },
            children
        );
    };

    return <>{siteStructure.map((item) => buildSite(item))}</>;
};

export default SiteRender;