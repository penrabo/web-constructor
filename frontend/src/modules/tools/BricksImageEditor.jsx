import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { useStore } from '../../store/useStore';
import { findElementById } from '../../utils/findElementById';

const BricksImageEditor = ( { isOpen }) => {
    //const [open, setOpen] = useState(false);
    //const [titleValue, setTitleValue] = useState('');

    //const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);
    const setSiteStructure = useStore((state) => state.setSiteStructure);
    const gallery = useStore((state) => state.gallery);
    //const setGallery = useStore((state) => state.setGallery);

    const loadTitle = () => {
        const card = findElementById(siteStructure, editingSubElementId);
        const titleElement = card?.children?.find(child => child.class === 'item-title');
        return titleElement?.content || '';
    };
    const updateImage = (newImage) => {
        // Создаем глубокую копию структуры
        const newStructure = JSON.parse(JSON.stringify(siteStructure));
        const card = findElementById(newStructure, editingSubElementId);
        const titleElement = card?.children?.find(child => child.class === 'item-image');
        titleElement.backgroundImage = newImage;
        // Обновляем структуру в сторе
        setSiteStructure(newStructure);
    };

    // Проверяем, активен ли наш инструмент
    useEffect(() => {
        if (isOpen) {
            //setTitleValue(loadTitle());

        } else {
            // очистка при закрытии диалога
            //setTitleValue('');
        }
    }, [isOpen]);

    const handleSave = () => {
        //updateTitle(titleValue);

        // Закрываем инструмент
        removeActiveTool('bricksImageEditor');
    };

    const handleClose = () => {
        removeActiveTool('bricksImageEditor');
    };

    if (!isOpen) return null;

    const applyImageToCard = (url) => {
        updateImage(url);
        handleClose();
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Редактировать заголовок</DialogTitle>
            <DialogContent>

                <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    {gallery.map((image) => (
                        <div
                            key={image.id}
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundImage: `url(${image.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            onClick={() => applyImageToCard(image.url)}
                        />
                    ))}
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BricksImageEditor;