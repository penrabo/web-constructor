// frontend/src/modules/tools/TextualTextEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import TextEditor from '../features/TextEditor.jsx';

const TextualTextEditor = () => {
    const activeTools = useStore((state) => state.activeTools);
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

    const isOpen = activeTools.includes('textualTextEditor');

    return (
        <TextEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            dialogTitle="Редактировать текст"
            isMultiline={true}
            onClose={() => removeActiveTool('textualTextEditor')}
        />
    );
};

export default TextualTextEditor;