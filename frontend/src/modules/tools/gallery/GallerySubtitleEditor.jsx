// frontend/src/modules/tools/GallerySubtitleEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import TextEditor from '../features/TextEditor.jsx';

const GallerySubtitleEditor = () => {
    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    const isOpen = activeTools.includes('gallerySubtitleEditor');

    const handleClose = () => {
        removeActiveTool('gallerySubtitleEditor');
    };

    return (
        <TextEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            targetRole="gallery-item-description"
            dialogTitle="Редактировать описание"
            isMultiline={true}
            onClose={handleClose}
        />
    );
};

export default GallerySubtitleEditor;