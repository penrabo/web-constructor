// frontend/src/modules/tools/BricksTitleEditor.jsx
import React from 'react';
import { useStore } from '../../store/useStore';
import TextEditor from './features/TextEditor';

const BricksTitleEditor = () => {
    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    const isOpen = activeTools.includes('bricksTitleEditor');

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