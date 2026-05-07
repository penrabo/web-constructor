// frontend/src/modules/tools/TextualEditor.jsx
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
import {useStore} from '../../../store/useStore.js';
import { findElementById } from '../../../utils/findElementById.js';
import { moveElement } from '../../../utils/moveElement.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {findInStructure} from "../../../utils/findInStructure.js";

const TextualEditor = ({isOpen}) => {
    const editingElementId = useStore((state) => state.editingElementId);
    const setEditingSubElementId = useStore((state) => state.setEditingSubElementId);
    const addActiveTool = useStore((state) => state.addActiveTool);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);

    const textualBlock = findElementById(siteStructure, editingElementId);

    const findTextualItems = (block) => {
        if (!block?.children) return [];
        // Ищем все элементы с role title или text
        return block.children.filter(child => child.role === 'title' || child.role === 'text') || [];
    };

    const textualItems = findTextualItems(textualBlock);

    const handleEditIconClick = (toolName, elementId, isMultiline) => {
        addActiveTool(toolName);
        setEditingSubElementId(elementId);
    };

    if (!isOpen) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={() => removeActiveTool('textual')}
            maxWidth="md"
            sx={{
                '& .MuiDialog-paper': {
                    width: '650px',
                    maxWidth: '650px'
                }
            }}
        >
            <DialogTitle>Редактор текстов</DialogTitle>
            <DialogContent>
                <List>
                    {textualItems.map((item, index) => {
                        const isTitle = item.role === 'title';
                        const displayText = item.content || (isTitle ? 'Заголовок' : 'Текст');
                        const toolName = isTitle ? 'textualTitleEditor' : 'textualTextEditor';

                        return (
                            <ListItem
                                key={item.id}
                                divider
                                secondaryAction={
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            edge="end"
                                            disabled={index === textualItems.length - 1}
                                            onClick={() => moveElement(editingElementId, index, 'down', null)}
                                        >
                                            <KeyboardArrowDownIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            disabled={index === 0}
                                            onClick={() => moveElement(editingElementId, index, 'up', null)}
                                        >
                                            <KeyboardArrowUpIcon />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditIconClick(toolName, item.id, !isTitle)}
                                        >
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <Typography
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                flex: 1
                                            }}
                                        >
                                            {displayText}
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default TextualEditor;