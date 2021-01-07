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
    markColor,
    markHeight,
    fadeColor
}) => {
    const [days, setDays] = useState<number[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const end = new Date().getFullYear();
        const start = !startYear || startYear > end ? (end - 100) : startYear;

        setDays([...Array(31)].map((_, index) => index + 1));
        setMonths([...Array(12)].map((_, index) => index + 1));
        setYears([...Array(end - start + 1)].map((_, index) => start + index));
    }, []);

    const pickerHeight: number = Math.round(height || Dimensions.get("window").height / 3.5);
    const pickerWidth: number | string = width || "100%";
    const unexpectedDate: Date = new Date(years[0], 0, 1);

    const changeHandle = (type: string, digit: number) : void => {
        const date = new Date(value || unexpectedDate);

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

    return (
        <View style={[styles.picker, { height: pickerHeight, width: pickerWidth }]}>
        {
            [days, months, years].map((el, index) => {
                const date = new Date(value || unexpectedDate);

                return (
                    <DateBlock
                        digits={el}
                        value={
                            index === 0
                            ? date.getDate()
                            : index === 1
                            ? date.getMonth() + 1
                            : date.getFullYear()
                        }
                        onChange={changeHandle}
                        height={pickerHeight}
                        fontSize={fontSize}
                        textColor={textColor}
                        markColor={markColor}
                        markHeight={markHeight}
                        fadeColor={fadeColor}
                        type={["day", "month", "year"][index]}
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
    fadeColor,
}) => {
    const dHeight: number = Math.round(height / 4);
    const mHeight: number = markHeight || Math.min(dHeight, 65);

    const fadeFilled: string = hex2rgba(fadeColor || '#ffffff', 1);
    const fadeTransparent: string = hex2rgba(fadeColor || '#ffffff', 0);

    const scrollRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        scrollRef.current.scrollTo({
            y: dHeight * (value - digits[0]),
            animated: true
        })
    }, [scrollRef.current, value])

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
                {digits.map((value, index) => {
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

const hex2rgba = (hex: string, alpha: number) : string => {
    hex = hex.replace("#", "");

    const r: number = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g: number = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b: number = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

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
        width: "70%",
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
    markColor?: string;
    markHeight?: number;
    fadeColor?: string;
    onChange (value: Date): void;
}

export interface DateBlockProps {
    onChange(type: string, digit: number): void;
    digits: number[];
    value: number;
    type: string;
    height: number;
    fontSize?: number;
    textColor?: string;
    markColor?: string
    markHeight?: number;
    fadeColor?: string;
}

export default DatePicker;