// frontend/src/modules/tools/GalleryImageEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import ImageEditor from '../features/ImageEditor.jsx';

const BricksImageEditor = ({isOpen}) => {
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

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