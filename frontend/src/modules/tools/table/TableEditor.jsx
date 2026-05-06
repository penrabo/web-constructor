// frontend/src/modules/tools/TableEditor.jsx
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

const TableEditor = ({isOpen}) => {
    const editingElementId = useStore((state) => state.editingElementId);
    const setEditingSubElementId = useStore((state) => state.setEditingSubElementId);
    const addActiveTool = useStore((state) => state.addActiveTool);
    const removeActiveTool = useStore((state) => state.removeActiveTool);
    const siteStructure = useStore((state) => state.siteStructure);

    const tableBlock = findElementById(siteStructure, editingElementId);

    const findTableItems = (block) => {
        if (!block?.children) return [];
        const tableInner = block.children.find(child => child.role === 'table-inner');
        return tableInner?.children.filter(child => child.role === 'table-item') || [];
    };

    const tableItems = findTableItems(tableBlock);

    const handleEditIconClick = (toolName, cellId) => {
        addActiveTool(toolName);
        setEditingSubElementId(cellId);
    };

    const handleAddCard = () => {
        addElement(editingElementId, 'tableItem', 'table-inner');
    };

    if (!isOpen) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={() => removeActiveTool('table')}
            maxWidth="md"
            sx={{
                '& .MuiDialog-paper': {
                    width: '650px',
                    maxWidth: '650px'
                }
            }}
        >
            <DialogTitle>Редактор таблицы</DialogTitle>
            <DialogContent>
                <List>
                    {tableItems.map((card, index) => {
                        const cells = card.children?.filter(child => child.role === 'table-item-cell') || [];

                        return (
                            <ListItem
                                key={card.id}
                                divider
                                secondaryAction={
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            edge="end"
                                            disabled={index === tableItems.length - 1}
                                            onClick={() => moveElement(editingElementId, index, 'down', 'table-inner')}
                                        >
                                            <KeyboardArrowDownIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            disabled={index === 0}
                                            onClick={() => moveElement(editingElementId, index, 'up', 'table-inner')}
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
                                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                                    {cells.map((cell) => (
                                        <Box
                                            key={cell.id}
                                            sx={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                minWidth: 0
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditIconClick('tableCellEditor', cell.id)}
                                            >
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                            <Typography
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {cell.content || '—'}
                                            </Typography>
                                        </Box>
                                    ))}
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

export default TableEditor;