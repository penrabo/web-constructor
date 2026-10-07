// frontend/src/modules/tools/GalleryImageEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import ImageEditor from '../features/ImageEditor.jsx';

const GalleryImageEditor = ({isOpen}) => {

    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    return (
        <ImageEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            targetRole="gallery-item-image"
            onClose={() => removeActiveTool('galleryImageEditor')}
        />
    );
};

export default GalleryImageEditor;