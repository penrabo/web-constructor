import { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import Header from './modules/Header';
import SiteRender from './modules/SiteRender.jsx';
import ToolLauncher from "./modules/ToolLauncher.jsx";
import DeleteBrickCard from './modules/tools/DeleteBrickCard';
import { useStore } from './store/useStore';
import { api } from './api/client';

function App() {
    const setSiteStructure = useStore((state) => state.setSiteStructure);
    const setGallery = useStore((state) => state.setGallery);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [galleryData, templateData] = await Promise.all([
                    api.getGallery(),
                    api.getTemplate('template1')
                ]);

                console.log('Загружена галерея: ', galleryData);
                console.log('Загружен шаблон 1: ', templateData);

                setGallery(galleryData);
                setSiteStructure(templateData);
            } catch (error) {
                console.error('Ошибка загрузки начальных данных: ', error);
            }
        };

        loadInitialData();
    }, [setGallery, setSiteStructure]);

    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <SiteRender />
                </Box>

                <Box sx={{ mt: 4 }}>
                    <ToolLauncher />
                    <DeleteBrickCard />
                </Box>
            </Container>
        </>
    );
}

export default App;