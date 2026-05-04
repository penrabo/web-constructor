// modules/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useStore } from '../store/useStore';
import { api } from '../api/client';

const Header = () => {
    const setSiteStructure = useStore((state) => state.setSiteStructure);
    const setGallery = useStore((state) => state.setGallery);

    const handleLoadTemplate = async () => {
        try {
            const templateData = await api.getTemplate('template1');
            console.log('Загружен шаблон 1:', templateData);
            // Если приходит массив - кладем как есть, если объект - заворачиваем в массив
            setSiteStructure(Array.isArray(templateData) ? templateData : templateData);
        } catch (error) {
            console.error('Ошибка загрузки шаблона 1:', error);
        }
    };

    const handleLoadTemplate2 = async () => {
        try {
            const templateData = await api.getTemplate('template2');
            console.log('Загружен шаблон 2:', templateData);
            setSiteStructure(Array.isArray(templateData) ? templateData : templateData);
        } catch (error) {
            console.error('Ошибка загрузки шаблона 2:', error);
        }
    };

    const handleLoadGallery = async () => {
        try {
            const galleryData = await api.getGallery();
            console.log('Загружена галерея: ', galleryData);
            setGallery(Array.isArray(galleryData) ? galleryData : [galleryData]);
        } catch (error) {
            console.error('Ошибка загрузки галереи. ', error);
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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLoadGallery}
                    >
                        тест!
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;