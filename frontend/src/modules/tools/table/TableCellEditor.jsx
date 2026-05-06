// frontend/src/modules/tools/TableCellEditor.jsx
import React from 'react';
import { useStore } from '../../../store/useStore.js';
import TextEditor from '../features/TextEditor.jsx';

const TableCellEditor = ({isOpen}) => {
    const editingSubElementId = useStore((state) => state.editingSubElementId);
    const removeActiveTool = useStore((state) => state.removeActiveTool);

console.log(editingSubElementId)
    return (
        <TextEditor
            isOpen={isOpen}
            elementId={editingSubElementId}
            dialogTitle="Редактировать ячейку"
            isMultiline={false}
            onClose={() => removeActiveTool('tableCellEditor')}
        />
    );
};

export default TableCellEditor;