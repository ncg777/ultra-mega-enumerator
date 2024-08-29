export abstract class Enumeration<T> implements Iterable<T> {
    protected abstract hasMoreElements(): boolean;
    protected abstract nextElement(): T;

    [Symbol.iterator](): Iterator<T> {
        const enumeration = this; // Capture the context

        return {
            next(): IteratorResult<T> {
                const hasNext = enumeration.hasMoreElements();
                const nextValue = hasNext ? enumeration.nextElement() : undefined;
                return { done: !hasNext, value: nextValue! }; // Use non-null assertion since we handle the case where hasNext is false
            },
        };
    }
}
