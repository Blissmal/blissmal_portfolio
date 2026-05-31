"use client";

import React, { createContext, useContext, useState } from "react";

const CursorContext = createContext({
    isAnimated: true,
    toggleCursor: () => { },
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAnimated, setIsAnimated] = useState(true);

    const toggleCursor = () => {
        setIsAnimated((prev) => !prev);
    };

    return (
        <CursorContext.Provider value={{ isAnimated, toggleCursor }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);