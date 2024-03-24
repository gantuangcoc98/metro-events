import { useEffect } from "react";

export const ClearLocalStorage = () => {
    const clear = () => {
        window.localStorage.clear();
    }

    useEffect(
        () => {
            clear();
        }, []
    )

    return (
        <div>Cleared!</div>
    )
}