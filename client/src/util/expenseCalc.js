export function toStringCents(price) {
    if (!Number.isInteger(price) || price === null || price === undefined) {
        throw new Error("Must be a positive int")
    }
    return `$${(price/100).toFixed(2)}`;
}


