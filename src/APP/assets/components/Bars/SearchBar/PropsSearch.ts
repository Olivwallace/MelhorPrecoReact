export interface PropsSearch {
    search: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDonw: (event: React.KeyboardEvent) => void;
    placeHolder?: string,
    className?: string;
}

export interface PropsSearchHome {
    search: {text: string, select: string, radio: string}
    onChange: Array<any>;
    onKeyDonw: (event: React.KeyboardEvent) => void;
    className?: string;
}