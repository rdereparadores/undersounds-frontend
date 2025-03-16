import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect } from "react"
import { useLocation } from "react-router"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}