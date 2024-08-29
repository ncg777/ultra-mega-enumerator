export abstract class AbstractEnumeration<T> implements Iterable<T> {
    protected abstract hasMoreElements(): boolean;
    protected abstract nextElement(): T;

    [Symbol.iterator](): Iterator<T> {
        return {
            next: () => {
                if (this.hasMoreElements()) {
                    return {
                        value: this.nextElement(),
                        done: false,
                    };
                } else {
                    return {
                        value: undefined,
                        done: true,
                    };
                }
            },
        };
    }
}
