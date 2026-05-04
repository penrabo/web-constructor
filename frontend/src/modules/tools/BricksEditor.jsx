import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    Box,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import {useStore} from '../../store/useStore';
import { findElementById } from '../../utils/findElementById';
import { findInStructure } from '../../utils/findInStructure';
import { deleteElement } from '../../utils/deleteElement';
import { moveElement } from '../../utils/moveElement';
import { BLOCK_TEMPLATES } from '../../templates/blockTemplates.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BricksEditor = ({isOpen}) => {
    //const activeTools = useStore((state) => state.activeTools);
    const editingElementId = useStore((state) => state.editingElementId);
    const setEditingSubElementId = useStore((state) => state.setEditingSubElementId);
    const addActiveTool = useStore((state) => state.addActiveTool);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);
    const setSiteStructure = useStore((state) => state.setSiteStructure);

    //const isOpen = activeTools.includes('bricks');

    const bricksBlock = findElementById(siteStructure, editingElementId);

    const findBricksItems = (block) => {
        if (!block?.children) return [];
        const bricksInner = block.children.find(child => child.role === 'bricks-inner');
        return bricksInner?.children.filter(child => child.role === 'bricks-item') || [];
    };

    const bricksItems = findBricksItems(bricksBlock);

    const handleEditIconClick = (toolName,cardId) => {
        addActiveTool(toolName);
        setEditingSubElementId(cardId);
    };

    const generateRandomId = () => {
        return Math.random().toString(36).substring(2, 10);
    };

    const handleAddCard = () => {
        const copySiteStructure = JSON.parse(JSON.stringify(siteStructure));
        const bricks = findInStructure(copySiteStructure, (item) => item.id === editingElementId);
        const bricksInner = findInStructure(bricks, (item) => item.role === 'bricks-inner');

        const newCard = JSON.parse(JSON.stringify(BLOCK_TEMPLATES.bricksCard));
        newCard.id = generateRandomId();

        bricksInner.children.push(newCard);
        setSiteStructure(copySiteStructure);
    };

    if (!isOpen) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={() => removeActiveTool('bricks')}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Редактор карточек (Bricks)</DialogTitle>
            <DialogContent>
                <List>
                    {bricksItems.map((card, index) => {
                        const titleElement = card.children?.find(child => child.class === 'item-title');
                        const titleText = titleElement?.content || 'Без названия';

                        return (
                            <ListItem
                                key={card.id}
                                divider
                                secondaryAction={
                                    <Box><IconButton
                                        edge="end"
                                        disabled={index === bricksItems.length - 1}
                                        onClick={() => moveElement(editingElementId, index, 'down', 'bricks-inner')}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </IconButton>

                                        <IconButton
                                            edge="end"
                                            disabled={index === 0}
                                            onClick={() => moveElement(editingElementId, index, 'up', 'bricks-inner')}
                                        >
                                            <KeyboardArrowUpIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleEditIconClick('bricksTitleEditor', card.id)}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleEditIconClick('bricksContentEditor', card.id)}
                                        >
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleEditIconClick('bricksImageEditor', card.id)}
                                        >
                                            <ImageIcon/>
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
                                <ListItemText primary={titleText}/>
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

export default BricksEditor;