// utils.js
export function handleErrors(fn) {
    return function (...args) {
        try {
            return fn(...args);
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };
}
