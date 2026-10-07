// frontend/src/modules/tools/GalleryTitleEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import TextEditor from '../features/TextEditor.jsx';

const BricksTitleEditor = ({isOpen}) => {
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    return (
        <TextEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            targetRole="item-title"
            dialogTitle="Редактировать заголовок"
            isMultiline={false}
            onClose={() => removeActiveTool('bricksTitleEditor')}
        />
    );
};

export default BricksTitleEditor;