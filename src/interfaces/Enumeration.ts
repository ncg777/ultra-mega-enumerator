export interface Enumeration<T> {
	hasMoreElements(): boolean;
	nextElement(): T;
}
