// frontend/src/modules/tools/GalleryTitleEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import TextEditor from '../features/TextEditor.jsx';

const GalleryTitleEditor = ({isOpen}) => {
    //const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    //const isOpen = activeTools.includes('galleryTitleEditor');

    return (
        <TextEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            targetRole="gallery-item-title"
            dialogTitle="Редактировать заголовок"
            isMultiline={false}
            onClose={() => removeActiveTool('galleryTitleEditor')}
        />
    );
};

export default GalleryTitleEditor;