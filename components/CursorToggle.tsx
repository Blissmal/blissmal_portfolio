"use client";

import React from "react";
import { useCursor } from "./CursorContext";
import { LuMousePointer2, LuMousePointer } from "react-icons/lu";

const CursorToggle = () => {
    const { isAnimated, toggleCursor } = useCursor();

    return (
        <button
            onClick={toggleCursor}
            className="flex items-center gap-2 px-3 py-1 text-[10px] tracking-[2px] uppercase border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-all duration-300 rounded-sm text-accent"
            title={isAnimated ? "Switch to normal cursor" : "Switch to animated cursor"}
        >
            {isAnimated ? <LuMousePointer2 size={14} /> : <LuMousePointer size={14} />}
            <span className="hidden sm:block">
                {isAnimated ? "Animated" : "Normal"}
            </span>
        </button>
    );
};

export default CursorToggle;