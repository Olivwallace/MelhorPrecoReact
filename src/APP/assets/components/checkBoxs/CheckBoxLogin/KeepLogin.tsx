import React from "react";

interface CheckBoxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?:string;
}

export const KeepLogin: React.FC<CheckBoxProps> = (props) => {
    return (
        <div style={{paddingTop: '10px'}} >
            <input type="checkbox" checked={props.checked} onChange={props.onChange} />
            <label>{props.label}</label>
        </div>
    );
};