import React from "react";
declare const DatePicker: React.FC<DatePickerProps>;
export interface DatePickerProps {
    value: Date | null | undefined;
    height?: number;
    width?: number | string;
    fontSize?: number;
    textColor?: string;
    startYear?: number;
    endYear?: number;
    markColor?: string;
    markHeight?: number;
    markWidth?: number | string;
    fadeColor?: string;
    format?: string;
    onChange(value: Date): void;
}
export interface DateBlockProps {
    digits: number[];
    value: number;
    type: string;
    height: number;
    fontSize?: number;
    textColor?: string;
    markColor?: string;
    markHeight?: number;
    markWidth?: number | string;
    fadeColor?: string;
    onChange(type: string, digit: number): void;
}
export default DatePicker;
