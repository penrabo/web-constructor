import { Container, Box } from '@mui/material';
import Header from './modules/Header';
import SiteRender from './modules/SiteRender.jsx';
import BricksEditor from './modules/tools/BricksEditor';
import BricksTitleEditor from './modules/tools/BricksTitleEditor';
//import BricksContentEditor from './modules/tools/BricksContentEditor';
//import BricksImageEditor from './modules/tools/BricksImageEditor';
import DeleteBrickCard from './modules/tools/DeleteBrickCard';
import ToolLauncher from "./modules/ToolLauncher.jsx";

function App() {
    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                    <SiteRender />
                </Box>

                {/* Панель инструментов */}
                <Box sx={{ mt: 4 }}>
                    <ToolLauncher />

                    <DeleteBrickCard />

                    {/*<BricksTitleEditor /> <BricksContentEditor />
                    <BricksImageEditor />
                    */}
                </Box>
            </Container>
        </>
    );
}

export default App;