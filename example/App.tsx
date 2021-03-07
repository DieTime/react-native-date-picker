import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";

import DatePicker from "@dietime/react-native-date-picker";

export default function App() {
    const [date, setDate] = useState<Date | null>();

    return (
        <View style={styles.container}>
            <View style={styles.date}>
                {
                    [
                        {title: "Day", value: date ? date.getDate() : "?"},
                        {title: "Month", value: date ? date.getMonth() + 1 : "?"},
                        {title: "Year", value: date ? date.getFullYear() : "?"},
                    ]
                    .map((el, index) => {
                        return (
                            <View style={styles.datePart} key={index}>
                                <Text style={styles.title}>{el.title}</Text>
                                <Text style={styles.digit}>{el.value}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <DatePicker
                value={date}
                width={"80%"}
                fontSize={19}
                height={170}
                onChange={(value: Date) => setDate(value)}
                format={"yyyy-mm-dd"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    date: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },
    datePart: {
        width: 100,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "200",
        marginBottom: 5,
    },
    digit: {
        fontSize: 20,
    }
});
