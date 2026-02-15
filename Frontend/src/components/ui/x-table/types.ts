export type Column<T> = {
    key: keyof T;
    label: string;
    copyable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
};
