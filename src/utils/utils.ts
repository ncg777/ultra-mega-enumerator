/**
 * Computes a hash code for a given value.
 * 
 * @param value - The value to hash.
 * @returns A number representing the hash code of the value.
 */
export function hashCodeFor(value: any): number {
    if (value == null) return 0; // Handle null and undefined cases
    if (typeof value === 'object') {
        return objectHashCode(value);
    }
    return typeof value === 'string' ? value.length : value;
}

/**
 * Computes a hash code for an object.
 * 
 * @param obj - The object to hash.
 * @returns A number representing the hash code of the object.
 */
export function objectHashCode(obj: object): number {
    return JSON.stringify(obj).split('').reduce((hash, char) => {
        return (hash << 5) - hash + char.charCodeAt(0); // Simple hash function
    }, 0);
}

/**
 * Computes a combined hash code for two values.
 * 
 * @param x - The first value.
 * @param y - The second value.
 * @returns A number representing the combined hash code.
 */
export function combineHashCodes(x: any, y: any): number {
    const prime: number = 31;
    let result: number = 1;

    result = prime * result + hashCodeFor(x);
    result = prime * result + hashCodeFor(y);

    return result;
}
