import React, {useEffect, useRef, useState} from "react";
import {View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

import {LinearGradient} from "expo-linear-gradient";

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    height,
    width,
    fontSize,
    textColor,
    startYear,
    endYear,
    markColor,
    markHeight,
    markWidth,
    fadeColor,
    format
}) => {
    const [days, setDays] = useState<number[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const end = endYear || new Date().getFullYear();
        const start = !startYear || startYear > end ? (end - 100) : startYear;

        const _days = [...Array(31)].map((_, index) => index + 1);
        const _months = [...Array(12)].map((_, index) => index + 1);
        const _years = [...Array(end - start + 1)].map((_, index) => start + index);

        setDays(_days);
        setMonths(_months);
        setYears(_years);
    }, []);

    const pickerHeight: number = Math.round(height || Dimensions.get("window").height / 3.5);
    const pickerWidth: number | string = width || "100%";

    const unexpectedDate: Date = new Date(years[0], 0, 1);
    const date = new Date(value || unexpectedDate);

    const changeHandle = (type: string, digit: number): void => {
        switch (type) {
            case "day":
                date.setDate(digit);
                break;
            case "month":
                date.setMonth(digit - 1);
                break;
            case "year":
                date.setFullYear(digit);
                break;
        }

        onChange(date);
    }

    const getOrder = () => {
        return (format || "dd-mm-yyyy").split("-").map((type, index) => {
            switch (type) {
                case "dd":
                    return {name: "day", digits: days, value: date.getDate()};
                case "mm":
                    return {name: "month", digits: months, value: date.getMonth() + 1};
                case "yyyy":
                    return {name: "year", digits: years, value: date.getFullYear()};
                default:
                    console.warn(`Invalid date picker format prop: found "${type}" in ${format}. Please read documentation!`)
                    return {
                        name: ["day", "month", "year"][index],
                        digits: [days, months, years][index],
                        value: [date.getDate(), date.getMonth() + 1, date.getFullYear()][index]
                    };
            }
        })
    }

    return (
        <View style={[styles.picker, {height: pickerHeight, width: pickerWidth}]}>
            {
                getOrder().map((el, index) => {
                    return (
                        <DateBlock
                            digits={el.digits}
                            value={el.value}
                            onChange={changeHandle}
                            height={pickerHeight}
                            fontSize={fontSize}
                            textColor={textColor}
                            markColor={markColor}
                            markHeight={markHeight}
                            markWidth={markWidth}
                            fadeColor={fadeColor}
                            type={el.name}
                            key={index}
                        />
                    )
                })
            }
        </View>
    );
};

const DateBlock: React.FC<DateBlockProps> = ({
    value,
    digits,
    type,
    onChange,
    height,
    fontSize,
    textColor,
    markColor,
    markHeight,
    markWidth,
    fadeColor,
}) => {
    const dHeight: number = Math.round(height / 4);

    const mHeight: number = markHeight || Math.min(dHeight, 65);
    const mWidth: number | string = markWidth || "70%";

    const fadeFilled: string = hex2rgba(fadeColor || "#ffffff", 1);
    const fadeTransparent: string = hex2rgba(fadeColor || "#ffffff", 0);

    const scrollRef = useRef(null);
    useEffect(() => {
        // @ts-ignore
        scrollRef.current.scrollTo({
            y: dHeight * (value - digits[0]),
            animated: true
        })
    }, [scrollRef.current])

    const handleChange = ({nativeEvent}: any) => {
        const digit = nativeEvent.contentOffset.y / dHeight + digits[0];

        if (Number.isInteger(digit)) {
            onChange(type, digit);
        }
    }

    return (
        <View style={styles.block}>
            <View
                style={[
                    styles.mark,
                    {
                        top: (height - mHeight) / 2,
                        backgroundColor: markColor || "rgba(0, 0, 0, 0.05)",
                        height: mHeight,
                        width: mWidth,
                    }
                ]}
            />
            <ScrollView
                ref={scrollRef}
                style={styles.scroll}
                snapToInterval={dHeight}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={0}
                onScroll={handleChange}
            >
                {digits.map((value: number, index: number) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                // @ts-ignore
                                scrollRef.current.scrollTo({
                                    y: dHeight * index,
                                    animated: true
                                })
                            }}
                        >
                            <Text
                                style={[
                                    styles.digit,
                                    {
                                        fontSize: fontSize || 22,
                                        color: textColor || "#000000",
                                        marginBottom: (index === digits.length - 1)
                                            ? height / 2 - dHeight / 2
                                            : 0,
                                        marginTop: (index === 0)
                                            ? height / 2 - dHeight / 2
                                            : 0,
                                        lineHeight: dHeight,
                                        height: dHeight,
                                    }
                                ]}
                            >
                                {value}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <LinearGradient
                style={[styles.gradient, {bottom: 0, height: height / 4}]}
                colors={[fadeTransparent, fadeFilled]}
                pointerEvents={"none"}
            />
            <LinearGradient
                style={[styles.gradient, {top: 0, height: height / 4}]}
                colors={[fadeFilled, fadeTransparent]}
                pointerEvents={"none"}
            />
        </View>
    )
};

const hex2rgba = (hex: string, alpha: number): string => {
    hex = hex.replace("#", "");

    const r: number = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g: number = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b: number = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

const styles = StyleSheet.create({
    picker: {
        flexDirection: "row",
        width: "100%",
    },
    block: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    scroll: {
        width: "100%",
    },
    digit: {
        fontSize: 20,
        textAlign: "center",
    },
    mark: {
        position: "absolute",
        borderRadius: 10,
    },
    gradient: {
        position: "absolute",
        width: "100%",
    }
})

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
    markColor?: string
    markHeight?: number;
    markWidth?: number | string;
    fadeColor?: string;

    onChange(type: string, digit: number): void;
}

export default DatePicker;
