import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { findElementById } from '../utils/findElementById';

function useSiteUpdater() {
    const count = useStore((state) => state.count);
    const increment = useCounterStore((state) => state.increment);

    // возвращаем объект с данными и функциями
    return {
        count,
        increment,
        decrement,
        reset
    };
}

export default useSiteUpdater;