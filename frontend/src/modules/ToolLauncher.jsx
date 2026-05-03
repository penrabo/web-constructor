import React from 'react';
import { useStore } from '../store/useStore';
import BricksEditor from "./tools/BricksEditor.jsx";
import BricksTitleEditor from "./tools/BricksTitleEditor.jsx";
import BricksContentEditor from "./tools/BricksContentEditor.jsx";
import BricksImageEditor from "./tools/BricksImageEditor.jsx";



const ToolLauncher = () => {
    const activeTools = useStore((state) => state.activeTools);
    const isOpenBricks = activeTools.includes('bricks');
    const isOpenBricksTitleEditor = activeTools.includes('bricksTitleEditor');
    const isOpenBricksContentEditor = activeTools.includes('bricksContentEditor');
    const isOpenBricksImageEditor = activeTools.includes('bricksImageEditor');


    return (
        <>
            <BricksEditor isOpen={isOpenBricks} />
            <BricksTitleEditor isOpen={isOpenBricksTitleEditor} />
            <BricksContentEditor isOpen={isOpenBricksContentEditor} />
            <BricksImageEditor isOpen={isOpenBricksImageEditor} />
        </>
    );
};

export default ToolLauncher;