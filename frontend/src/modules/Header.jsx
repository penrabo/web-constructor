import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, TextField } from '@mui/material';
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

    const handleSave = async () => {
        const structure = useStore.getState().siteStructure;
        try {
            const result = await api.saveSite('Мой сайт', structure);
            console.log('Сохранено:', result);
        } catch (error) {
            console.error('Ошибка сохранения:', error);
        }
    };

    const [loadId, setLoadId] = useState('');

    const handleLoad = async () => {
        try {
            const data = await api.loadSite(loadId);
            setSiteStructure(data.structure);
            console.log('Загружен сайт:', data.name);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
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
                    <Button variant="contained" color="success" onClick={handleSave}>
                        Сохранить
                    </Button>
                    <TextField
                        size="small"
                        placeholder="ID сайта"
                        value={loadId}
                        onChange={(e) => setLoadId(e.target.value)}
                        sx={{ width: 100 }}
                    />
                    <Button variant="contained" onClick={handleLoad}>
                        Загрузить
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;