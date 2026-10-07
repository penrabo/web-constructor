// frontend/src/modules/tools/GallerySubtitleEditor.jsx
  import React  from 'react';
import { useStore } from '../../../store/useStore.js';
import TextEditor from '../features/TextEditor.jsx';

const BricksContentEditor = ({isOpen}) => {
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);


    const handleClose = () => {
        removeActiveTool('bricksContentEditor');
    };

    return (
        <TextEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            targetRole="item-content"
            dialogTitle="Редактировать текст"
            isMultiline={true}
            onClose={handleClose}
        />
    );
};

export default BricksContentEditor;