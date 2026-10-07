import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    Box,
    IconButton,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useStore} from '../../../store/useStore.js';
import { findElementById } from '../../../utils/findElementById.js';
import { deleteElement } from '../../../utils/deleteElement.js';
import { moveElement } from '../../../utils/moveElement.js';
import { addElement } from '../../../utils/addElement.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {findInStructure} from "../../../utils/findInStructure.js";

const GalleryEditor = ({isOpen}) => {
    const editingElementId = useStore((state) => state.editingElementId);
    const setEditingSubElementId = useStore((state) => state.setEditingSubElementId);
    const addActiveTool = useStore((state) => state.addActiveTool);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);

    const galleryBlock = findElementById(siteStructure, editingElementId);

    const findGalleryItems = (block) => {
        if (!block?.children) return [];
        const galleryInner = block.children.find(child => child.role === 'gallery-inner');
        return galleryInner?.children.filter(child => child.role === 'gallery-item') || [];
    };

    const galleryItems = findGalleryItems(galleryBlock);

    const handleEditIconClick = (toolName, cardId) => {
        addActiveTool(toolName);
        setEditingSubElementId(cardId);
    };

    const handleAddCard = () => {
        addElement(editingElementId, 'galleryItem', 'gallery-inner');
    };

    if (!isOpen) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={() => removeActiveTool('gallery')}
            maxWidth="md"
            sx={{
                '& .MuiDialog-paper': {
                    width: '650px',
                    maxWidth: '650px'
                }
            }}
        >
            <DialogTitle>Редактор галереи</DialogTitle>
            <DialogContent>
                <List>
                    {galleryItems.map((card, index) => {
                        const titleElement = findInStructure(card, (item) => item.role === 'gallery-item-title');
                        const titleText = titleElement?.content || 'Без названия';

                        const descElement = findInStructure(card, (item) => item.role === 'gallery-item-description');
                        const descText = descElement?.content || '';

                        const imageElement = findInStructure(card, (item) => item.role === 'gallery-item-image');
                        const imageUrl = imageElement?.backgroundImage || '';

                        return (
                            <ListItem
                                key={card.id}
                                divider
                                secondaryAction={
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            edge="end"
                                            disabled={index === galleryItems.length - 1}
                                            onClick={() => moveElement(editingElementId, index, 'down', 'gallery-inner')}
                                        >
                                            <KeyboardArrowDownIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            disabled={index === 0}
                                            onClick={() => moveElement(editingElementId, index, 'up', 'gallery-inner')}
                                        >
                                            <KeyboardArrowUpIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            onClick={() => deleteElement(card.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
                                    {/* Миниатюра */}
                                    <Box
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            backgroundImage: `url(${imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            flexShrink: 0,
                                            '&:hover': { opacity: 0.8 }
                                        }}
                                        onClick={() => handleEditIconClick('galleryImageEditor', card.id)}
                                    />

                                    {/* Текстовые поля */}
                                    <Box sx={{ flexGrow: 1 }}>
                                        {/* Заголовок */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Typography
                                                sx={{
                                                    width: '110px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {titleText}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditIconClick('galleryTitleEditor', card.id)}
                                            >
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                        </Box>

                                        {/* Подзаголовок */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography
                                                sx={{
                                                    width: '110px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {descText}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditIconClick('gallerySubtitleEditor', card.id)}
                                            >
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>

                <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                    <IconButton
                        color="primary"
                        onClick={() => handleAddCard()}
                    >
                        <AddIcon/>
                    </IconButton>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default GalleryEditor;