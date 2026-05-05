// frontend/src/modules/tools/features/ImageEditor.jsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    ImageList,
    ImageListItem
} from '@mui/material';
import { useStore } from '../../../store/useStore';
import { findElementById } from '../../../utils/findElementById';
import { findInStructure } from '../../../utils/findInStructure';

const ImageEditor = ({ isOpen, elementId, targetRole, onClose }) => {
    const siteStructure = useStore((state) => state.siteStructure);
    const setSiteStructure = useStore((state) => state.setSiteStructure);
    const gallery = useStore((state) => state.gallery);

    const updateImage = (imageUrl) => {
        const newStructure = JSON.parse(JSON.stringify(siteStructure));
        const parent = findElementById(newStructure, elementId);
        if (!parent) return;

        const target = findInStructure(parent, (item) => item.role === targetRole);
        if (target) {
            target.backgroundImage = imageUrl;
        }

        setSiteStructure(newStructure);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Выбрать изображение</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', mt: 1 }}>
                    {gallery.map((image) => (
                        <Box
                            key={image.id || image.filename}
                            sx={{
                                width: '100px',
                                height: '100px',
                                backgroundImage: `url(${image.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer',
                                '&:hover': { opacity: 0.8 }
                            }}
                            onClick={() => updateImage(image.url)}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageEditor;