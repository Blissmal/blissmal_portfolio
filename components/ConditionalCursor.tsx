"use client";

import React from "react";
import { useCursor } from "./CursorContext";
import AnimatedCursor from "./AnimatedCursor";

const ConditionalCursor = () => {
    const { isAnimated } = useCursor();
    return isAnimated ? <AnimatedCursor /> : null;
};

export default ConditionalCursor;