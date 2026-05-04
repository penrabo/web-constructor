import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useStore } from '../store/useStore';
import { api } from '../api/client';

const Header = () => {
    const setSiteStructure = useStore((state) => state.setSiteStructure);

    const handleLoadTemplate = async () => {
        try {
            const templateData = await api.getTemplate('template1');
            setSiteStructure(templateData);
        } catch (error) {
            console.error('Ошибка загрузки шаблона 1:', error);
        }
    };

    const handleLoadTemplate2 = async () => {
        try {
            const templateData = await api.getTemplate('template2');
            setSiteStructure(templateData);
        } catch (error) {
            console.error('Ошибка загрузки шаблона 2:', error);
        }
    };

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoadTemplate}
                    >
                        Загрузить шаблон 1
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLoadTemplate2}
                    >
                        Загрузить шаблон 2
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;