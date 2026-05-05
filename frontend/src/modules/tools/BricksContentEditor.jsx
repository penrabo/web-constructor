// frontend/src/modules/tools/BricksContentEditor.jsx
  import React  from 'react';
import { useStore } from '../../store/useStore';
import TextEditor from './features/TextEditor.jsx';

const BricksContentEditor = () => {
    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    const isOpen = activeTools.includes('bricksContentEditor');

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