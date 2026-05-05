import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useStore } from '../store/useStore';

const ToolActivator = ({ builderTool, elementId }) => {
    const addActiveTool = useStore((state) => state.addActiveTool);
    const setEditingElementId = useStore((state) => state.setEditingElementId);

    const handleClick = () => {
        console.log('Добавляем инструмент:', builderTool);
        addActiveTool(builderTool);
        setEditingElementId(elementId);
    };

    return (
        <IconButton
            size="small"
            onClick={handleClick}
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
            }}
        >
            <EditIcon fontSize="small" />
        </IconButton>
    );
};

export default ToolActivator;