// frontend/src/modules/tools/features/TextEditor.jsx
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { useStore } from '../../../store/useStore';
import { findElementById } from '../../../utils/findElementById';
import { findInStructure } from '../../../utils/findInStructure';

const TextEditor = ({ isOpen, elementId, targetRole, dialogTitle, isMultiline, onClose }) => {
    const [contentValue, setContentValue] = useState('');

    const siteStructure = useStore((state) => state.siteStructure);
    const setSiteStructure = useStore((state) => state.setSiteStructure);

    const loadContent = () => {
        const target = findElementById(siteStructure, elementId);
        if (!target) return '';

        if (targetRole) {
            const nested = findInStructure(target, (item) => item.role === targetRole);
            return nested?.content || '';
        }

        return target?.content || '';
    };

    const updateContent = (newContent) => {
        const newStructure = JSON.parse(JSON.stringify(siteStructure));
        const target = findElementById(newStructure, elementId);
        if (!target) return;

        if (targetRole) {
            const nested = findInStructure(target, (item) => item.role === targetRole);
            if (nested) nested.content = newContent;
        } else {
            target.content = newContent;
        }

        setSiteStructure(newStructure);
    };

    useEffect(() => {
        if (isOpen) {
            setContentValue(loadContent());
        } else {
            setContentValue('');
        }
    }, [isOpen]);

    const handleSave = () => {
        updateContent(contentValue);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                    multiline={isMultiline}
                    rows={isMultiline ? 4 : undefined}
                    sx={{ mt: 1 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TextEditor;