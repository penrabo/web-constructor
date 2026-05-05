import React from 'react';
import { useStore } from '../store/useStore';
import BricksEditor from "./tools/bricks/BricksEditor.jsx";
import BricksTitleEditor from "./tools/bricks/BricksTitleEditor.jsx";
import BricksContentEditor from "./tools/bricks/BricksContentEditor.jsx";
import BricksImageEditor from "./tools/bricks/BricksImageEditor.jsx";
import GalleryEditor from "./tools/gallery/GalleryEditor.jsx";
import GalleryTitleEditor from "./tools/gallery/GalleryTitleEditor.jsx";
import GalleryImageEditor from "./tools/gallery/GalleryImageEditor.jsx";
import GallerySubtitleEditor from "./tools/gallery/GallerySubtitleEditor.jsx";



const ToolLauncher = () => {
    const activeTools = useStore((state) => state.activeTools);
    const isOpenBricks = activeTools.includes('bricks');
    const isOpenBricksTitleEditor = activeTools.includes('bricksTitleEditor');
    const isOpenBricksContentEditor = activeTools.includes('bricksContentEditor');
    const isOpenBricksImageEditor = activeTools.includes('bricksImageEditor');
    const isOpenGallery = activeTools.includes('gallery');
    const isOpenGalleryTitleEditor = activeTools.includes('galleryTitleEditor');
    const isOpenGalleryContentEditor = activeTools.includes('galleryContentEditor');
    const isOpenGalleryImageEditor = activeTools.includes('galleryImageEditor');


    return (
        <>
            <BricksEditor isOpen={isOpenBricks} />
            <BricksTitleEditor isOpen={isOpenBricksTitleEditor} />
            <BricksContentEditor isOpen={isOpenBricksContentEditor} />
            <BricksImageEditor isOpen={isOpenBricksImageEditor} />
            <GalleryEditor isOpen={isOpenGallery} />
            <GalleryTitleEditor isOpen={isOpenGalleryTitleEditor} />
            <GallerySubtitleEditor isOpen={isOpenGalleryContentEditor} />
            <GalleryImageEditor isOpen={isOpenGalleryImageEditor} />
        </>
    );
};

export default ToolLauncher;