export declare interface ContainerProps {
    children: React.ReactNode;
}

export declare interface RowProps {
    align?: "flex-start" | "center" | "flex-end" | "space-between";
    children: React.ReactNode;
}

export declare interface ColProps {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    children: React.ReactNode;
}
