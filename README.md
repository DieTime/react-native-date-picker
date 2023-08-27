<p align="center">
  <img src="https://github.com/DieTime/react-native-date-picker/raw/master/assets/logo.png" style="margin-bottom: -30px" width="320"/>
</p>

<p align="center">
    <a href="https://snack.expo.io/@checkcompany/063372">🎯 Try component at snack.expo.io</a>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat&logo=EXPO&labelColor=ffffff&logoColor=000" alt="npm type definitions"/>
    <img src="https://img.shields.io/npm/types/@dietime/react-native-date-picker" alt="npm type definitions"/>
    <img src="https://img.shields.io/bundlephobia/min/@dietime/react-native-date-picker" alt="npm bundle size"/>
</p>

React Native customizable date picker component for iOS and Android. Designed using ScrollView. Looks identical on all
devices.

## 💻 Example
<img style="margin-top: 10px" src="https://github.com/DieTime/react-native-date-picker/raw/master/assets/example.gif" height="400" alt="component-gif-preview"/>

## 💬 Installation

### 1. Add dependency to the project

```bash
$ yarn add @dietime/react-native-date-picker
```

```bash
$ npm install @dietime/react-native-date-picker --save
```

### 2. Import dependency

```js
import DatePicker from '@dietime/react-native-date-picker';
```

## 👩‍💻 Usage

```javascript
import React, {useState} from "react";
import {Text, View} from "react-native";

import DatePicker from "@dietime/react-native-date-picker";

export default function App() {
    const [date, setDate] = useState();

    return (
        <View>
            <Text>{date ? date.toDateString() : "Select date..."}</Text>
            <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
                format="yyyy-mm-dd"
            />
        </View>
    );
}
```

## 📚 Documentation

| Prop       | Required | Type                      | Description                                                   |
|:---------- |:--------:|:------------------------- | ------------------------------------------------------------- |
| value      | ✅        | Date or null or undefined | Initial date for component                                    |
| onChange   | ✅        | (value: Date) : void      | Callback on date change event                                 |
| height     | ⛔        | number                    | Custom component height                                       |
| width      | ⛔        | number or string          | Custom component width such as `100` or `'50%'`                   |
| fontSize   | ⛔        | number                    | Custom digits font size                                       |
| textColor  | ⛔        | string                    | Custom digits text color such as hex, rgb or rgba             |
| endYear    | ⛔        | number                    | Max year in component, default is current year                |
| startYear  | ⛔        | number                    | Min year in component, default is `endYear - 100`             |
| markColor  | ⛔        | string                    | Custom middle mark color such as `hex`, `rgb` or `rgba`             |
| markHeight | ⛔        | number                    | Custom height of middle mark                                  |
| markWidth  | ⛔        | number or string          | Custom width of middle mark such as `100` or `'50%'`              |
| fadeColor  | ⛔        | string                    | Custom color for top and bottom fade effect `only hex colors!` |
| format     | ⛔        | string                    | Custom picker format like reshuffle of `yyyy`, `mm`, `dd`. Example: `'yyyy-mm-dd'` or `'dd-mm-yyyy'` and other |

## 📃 License

Copyright 2023 Denis Glazkov glazzk.off@mail.ru

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
