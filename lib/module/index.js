import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const DatePicker = _ref => {
  let {
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
  } = _ref;
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  useEffect(() => {
    const end = endYear || new Date().getFullYear();
    const start = !startYear || startYear > end ? end - 100 : startYear;
    const _days = [...Array(31)].map((_, index) => index + 1);
    const _months = [...Array(12)].map((_, index) => index + 1);
    const _years = [...Array(end - start + 1)].map((_, index) => start + index);
    setDays(_days);
    setMonths(_months);
    setYears(_years);
  }, []);
  const pickerHeight = Math.round(height || Dimensions.get("window").height / 3.5);
  const pickerWidth = width || "100%";
  const unexpectedDate = new Date(years[0], 0, 1);
  const date = new Date(value || unexpectedDate);
  const changeHandle = (type, digit) => {
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
  };
  const getOrder = () => {
    return (format || "dd-mm-yyyy").split("-").map((type, index) => {
      switch (type) {
        case "dd":
          return {
            name: "day",
            digits: days,
            value: date.getDate()
          };
        case "mm":
          return {
            name: "month",
            digits: months,
            value: date.getMonth() + 1
          };
        case "yyyy":
          return {
            name: "year",
            digits: years,
            value: date.getFullYear()
          };
        default:
          console.warn(`Invalid date picker format prop: found "${type}" in ${format}. Please read documentation!`);
          return {
            name: ["day", "month", "year"][index],
            digits: [days, months, years][index],
            value: [date.getDate(), date.getMonth() + 1, date.getFullYear()][index]
          };
      }
    });
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.picker, {
      height: pickerHeight,
      width: pickerWidth
    }]
  }, getOrder().map((el, index) => {
    return /*#__PURE__*/React.createElement(DateBlock, {
      digits: el.digits,
      value: el.value,
      onChange: changeHandle,
      height: pickerHeight,
      fontSize: fontSize,
      textColor: textColor,
      markColor: markColor,
      markHeight: markHeight,
      markWidth: markWidth,
      fadeColor: fadeColor,
      type: el.name,
      key: index
    });
  }));
};
const DateBlock = _ref2 => {
  let {
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
    fadeColor
  } = _ref2;
  const dHeight = Math.round(height / 4);
  const mHeight = markHeight || Math.min(dHeight, 65);
  const mWidth = markWidth || "70%";
  const offsets = digits.map((_, index) => index * dHeight);
  const fadeFilled = hex2rgba(fadeColor || "#ffffff", 1);
  const fadeTransparent = hex2rgba(fadeColor || "#ffffff", 0);
  const scrollRef = useRef(null);
  const snapScrollToIndex = index => {
    var _scrollRef$current;
    scrollRef === null || scrollRef === void 0 || (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 || _scrollRef$current.scrollTo({
      y: dHeight * index,
      animated: true
    });
  };
  useEffect(() => {
    snapScrollToIndex(value - digits[0]);
  }, [scrollRef.current]);
  const handleMomentumScrollEnd = _ref3 => {
    let {
      nativeEvent
    } = _ref3;
    const digit = Math.round(nativeEvent.contentOffset.y / dHeight + digits[0]);
    onChange(type, digit);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.block
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.mark, {
      top: (height - mHeight) / 2,
      backgroundColor: markColor || "rgba(0, 0, 0, 0.05)",
      height: mHeight,
      width: mWidth
    }]
  }), /*#__PURE__*/React.createElement(ScrollView, {
    ref: scrollRef,
    style: styles.scroll,
    snapToOffsets: offsets,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 0,
    onMomentumScrollEnd: handleMomentumScrollEnd
  }, digits.map((value, index) => {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      key: index,
      onPress: () => {
        onChange(type, digits[index]);
        snapScrollToIndex(index);
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.digit, {
        fontSize: fontSize || 22,
        color: textColor || "#000000",
        marginBottom: index === digits.length - 1 ? height / 2 - dHeight / 2 : 0,
        marginTop: index === 0 ? height / 2 - dHeight / 2 : 0,
        lineHeight: dHeight,
        height: dHeight
      }]
    }, value));
  })), /*#__PURE__*/React.createElement(LinearGradient, {
    style: [styles.gradient, {
      bottom: 0,
      height: height / 4
    }],
    colors: [fadeTransparent, fadeFilled],
    pointerEvents: "none"
  }), /*#__PURE__*/React.createElement(LinearGradient, {
    style: [styles.gradient, {
      top: 0,
      height: height / 4
    }],
    colors: [fadeFilled, fadeTransparent],
    pointerEvents: "none"
  }));
};
const hex2rgba = (hex, alpha) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
};
const styles = StyleSheet.create({
  picker: {
    flexDirection: "row",
    width: "100%"
  },
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  scroll: {
    width: "100%"
  },
  digit: {
    fontSize: 20,
    textAlign: "center"
  },
  mark: {
    position: "absolute",
    borderRadius: 10
  },
  gradient: {
    position: "absolute",
    width: "100%"
  }
});
export default DatePicker;
//# sourceMappingURL=index.js.map