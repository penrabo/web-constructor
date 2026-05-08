// frontend/src/modules/tools/TextualEditor.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    Box,
    IconButton,
    Typography,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {useStore} from '../../../store/useStore.js';
import { findElementById } from '../../../utils/findElementById.js';
import { moveElement } from '../../../utils/moveElement.js';
import { addElement } from '../../../utils/addElement.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const TextualEditor = ({isOpen}) => {
    const editingElementId = useStore((state) => state.editingElementId);
    const setEditingSubElementId = useStore((state) => state.setEditingSubElementId);
    const addActiveTool = useStore((state) => state.addActiveTool);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);

    const [selectedBlock, setSelectedBlock] = useState('textualText');

    const textualBlock = findElementById(siteStructure, editingElementId);

    const findTextualItems = (block) => {
        if (!block?.children) return [];
        return block.children.filter(child => child.role === 'title' || child.role === 'text') || [];
    };

    const textualItems = findTextualItems(textualBlock);

    const handleEditIconClick = (toolName, elementId) => {
        addActiveTool(toolName);
        setEditingSubElementId(elementId);
    };

    const handleAddBlock = () => {
        addElement(editingElementId, selectedBlock, null);
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
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditIconClick(toolName, item.id)}
                                        >
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <Typography
                                            sx={{
                                                flex: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                ...(isTitle ? {
                                                    whiteSpace: 'nowrap'
                                                } : {
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    whiteSpace: 'normal'
                                                })
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

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                            value={selectedBlock}
                            onChange={(e) => setSelectedBlock(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value="textualTitle">Заголовок</MenuItem>
                            <MenuItem value="textualSubtitle">Подзаголовок</MenuItem>
                            <MenuItem value="textualText">Текст</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton
                        color="primary"
                        onClick={handleAddBlock}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default TextualEditor;