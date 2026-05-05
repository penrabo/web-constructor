// frontend/src/modules/tools/BricksImageEditor.jsx
import React from 'react';
import { useStore } from '../../store/useStore';
import ImageEditor from './features/ImageEditor';

const BricksImageEditor = () => {
    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    const isOpen = activeTools.includes('bricksImageEditor');

    return (
        <ImageEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            targetRole="item-image"
            onClose={() => removeActiveTool('bricksImageEditor')}
        />
    );
};

export default BricksImageEditor;