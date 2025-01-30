"use client";

import { useState, useEffect } from "react";
import ServerError from "@/components/custom/error/ServerError";

export default function Test2({ message }) {
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(new Error(`401 || ${message}`));
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    if (error) {
        return <ServerError error={error} />;
    }

    return <div>{message}</div>;
}