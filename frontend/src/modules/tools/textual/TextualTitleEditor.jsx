// frontend/src/modules/tools/TextualTitleEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import TextEditor from '../features/TextEditor.jsx';

const TextualTitleEditor = () => {
    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    const isOpen = activeTools.includes('textualTitleEditor');

    return (
        <TextEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            dialogTitle="Редактировать заголовок"
            isMultiline={false}
            onClose={() => removeActiveTool('textualTitleEditor')}
        />
    );
};

export default TextualTitleEditor;