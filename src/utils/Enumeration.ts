export abstract class Enumeration<T> {
    protected abstract hasMoreElements(): boolean;
    protected abstract nextElement(): T;
}
