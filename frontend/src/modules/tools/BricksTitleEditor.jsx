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

const BricksTitleEditor = ( { isOpen }) => {
    //const [open, setOpen] = useState(false);
    const [titleValue, setTitleValue] = useState('');

    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);
    const setSiteStructure = useStore((state) => state.setSiteStructure);

    const loadTitle = () => {
        const card = findElementById(siteStructure, editingSubElementId);
        const titleElement = card?.children?.find(child => child.class === 'item-title');
        return titleElement?.content || '';
    };
    const updateTitle = (newTitle) => {
        // Создаем глубокую копию структуры
        const newStructure = JSON.parse(JSON.stringify(siteStructure));
        const card = findElementById(newStructure, editingSubElementId);
        const titleElement = card?.children?.find(child => child.class === 'item-title');
        titleElement.content = newTitle;
        // Обновляем структуру в сторе
        setSiteStructure(newStructure);
    };

    // Проверяем, активен ли наш инструмент
    useEffect(() => {
        if (isOpen) {
            setTitleValue(loadTitle());
        } else {
            // очистка при закрытии диалога
            setTitleValue('');
        }
    }, [isOpen]);

    const handleSave = () => {
        updateTitle(titleValue);

        // Закрываем инструмент
        removeActiveTool('bricksTitleEditor');
    };

    const handleClose = () => {
        removeActiveTool('bricksTitleEditor');
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Редактировать заголовок</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Заголовок карточки"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    sx={{ mt: 1 }}
                />
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

export default BricksTitleEditor;