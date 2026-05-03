import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';

const TextEdit = ( {isOpen, isMultiline, initialValue, handleClose, handleSave, dialogTitle }) => {
    const [titleValue, setTitleValue] = useState(initialValue);

    useEffect(() => {
        setTitleValue(initialValue);
    }, [initialValue]);

return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                multiline={isMultiline}  // true/false
                rows={isMultiline ? 4 : undefined}
                sx={{ mt: 1 }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={() => handleSave(titleValue)}>Сохранить</Button>
        </DialogActions>
    </Dialog>
);
};

export default TextEdit;