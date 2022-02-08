import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Animated, ViewStyle, LayoutRectangle } from 'react-native';
import { Nullable } from '../types';
import { useTheme } from '@react-navigation/native';

interface AnimatedInputProps {
    style?: ViewStyle | ViewStyle[];
    inputValue?: string,

}

const AnimatedInput = (props: AnimatedInputProps) => {
    const {
        style,
        inputValue = '',

    } = props

    const { dark, colors } = useTheme();
    const [isFocus, changeIsFocus] = useState<boolean>(false);
    const [inputNotEmpty, changeInputNotEmpty] = useState<boolean>(false);
    const [infoInput, changeInfoInput] = useState<Nullable<LayoutRectangle>>(null)
    const [infoText, changeInfoText] = useState<Nullable<LayoutRectangle>>(null)
    const [isVisibleText, changeVisibleText] = useState<boolean>(false);
    const [zIndex, changeZIndex] = useState<number>(-1);
    const [inputText, changeInputText] = useState<string>(inputValue)

    const inputXY = useState(new Animated.ValueXY())[0]

    useEffect(() => {
        if (inputText.length > 0) {
            changeInputNotEmpty(true)
        }

        if (infoInput && infoText) {

            const hightPos = {
                x: infoInput.x,
                y: infoInput.y - infoText.height / 2 - 1
            }

            const downPos = {
                x: infoInput.x,
                y: infoInput.height / 2 - infoText.height / 2
            }

            const toValue = isFocus || inputNotEmpty ? hightPos : downPos
            isFocus || inputNotEmpty ? changeZIndex(1) : setTimeout(() => { changeZIndex(-1) }, 250);

            Animated.timing(inputXY, {
                toValue: toValue,
                duration: 400,
                useNativeDriver: true,
            }).start()
        }
    }, [isFocus, inputNotEmpty, inputText])


    return (
        <View style={[InputContainer.ViewContainer, style]}

        >
            <TextInput style={[InputContainer.InputContainer, {
                zIndex: zIndex * (-1)
            }]}
                onFocus={() => { changeIsFocus(true) }}
                onBlur={() => { changeIsFocus(false) }}
                value={inputText}
                onChangeText={(el) => {
                    changeInputText(el);
                    if (el.length > 0) {
                        changeInputNotEmpty(true);
                    } else changeInputNotEmpty(false);
                }}
                onLayout={(e) => {
                    changeInfoInput(e.nativeEvent.layout);
                    changeVisibleText(true)
                }}

            >

            </TextInput>

            {isVisibleText ? <Animated.Text
                onLayout={(e) => {
                    changeInfoText(e.nativeEvent.layout)

                    const valueStartRenderText = inputNotEmpty ? { x: infoInput.x, y: infoInput.y - e.nativeEvent.layout.height / 2 - 1 } :
                        { x: infoInput.x, y: infoInput.height / 2 - e.nativeEvent.layout.height / 2 }

                    inputXY.setValue(valueStartRenderText)
                    // inputXY.setValue({ x: infoInput.x, y: infoInput.height / 2 - e.nativeEvent.layout.height / 2 })
                }}

                style={[InputContainer.AnimatedTextContainer,
                {
                    backgroundColor: colors.background.default,
                    zIndex: zIndex,
                    transform: [
                        { translateX: inputXY.x },
                        { translateY: inputXY.y }
                    ]
                }

                ]}

            >
                Text
            </Animated.Text> : null}

        </View>
    )
}

const InputContainer = StyleSheet.create({
    ViewContainer: {

        borderWidth: 1,
        borderRadius: 5,
        padding: 0,
        borderColor: '#006D77',
    },
    InputContainer: {
        flex: 1,
        borderRadius: 5,
    },
    AnimatedTextContainer: {
        position: 'absolute',
        borderRadius: 5,

    }
})


export default AnimatedInput