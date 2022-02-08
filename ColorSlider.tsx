
import React, { useRef, useState } from 'react'
import {  View, Text, StyleSheet, PanResponder, Animated, ViewStyle, } from 'react-native';
import { Nullable } from '../types';

interface ColorSliderProps {
    style?: ViewStyle | ViewStyle[]
}

const ColorSlider = (props: ColorSliderProps) => {
    const { style } = props;

    const [widthColorView, setWidthColorView] = useState(null);
    const [width, setWidth] = useState<Nullable<number>>(null)
    const [currentPositionPointer, setCurrentPositionPointer] = useState(0);
    const COLORS = [
        '#FE2525',
        '#FEE725',
        '#3FFE25',
        '#25FEE9',
        '#2540FE',
        '#FE25F4',
    ]
    const inputRange = []
    COLORS.forEach((color, index, self) => {
        inputRange.push((width || 0) / self.length * (index + 1))
    })
    const animatedColorValue = useRef(new Animated.Value(inputRange[0])).current

    const panPositionValue = useRef(new Animated.Value(currentPositionPointer)).current

    const panPositionResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderMove: (evt, gestureState) => {
            panPositionValue.setValue(gestureState.moveX)
            setCurrentPositionPointer(Math.trunc(gestureState.moveX))
            animatedColorValue.setValue(gestureState.moveX)
        }
    })

    const color = animatedColorValue.interpolate({ inputRange, outputRange: COLORS })

    return (
        <View style={[styles.ViewContainer, style]} onLayout={e => setWidth(e.nativeEvent.layout.width)}>

            <Animated.View style={{ flex: 1, backgroundColor: color }}>

            </Animated.View>

            <Animated.View   {...panPositionResponder.panHandlers}
                style={{
                    zIndex: 100,
                    position: 'absolute',
                    height: 30,
                    width: 50,
                    transform: [{
                        translateX: panPositionValue,
                    }]
                }}
            >
                <Animated.View

                    style={{
                        alignSelf: 'center',
                        height: 30,
                        width: 8,
                        backgroundColor: "black",
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: 'white',

                    }}>

                </Animated.View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    ViewContainer: {
        borderColor: '#006D77',
        borderWidth: 2,
        borderRadius: 3,
        height: 300
    },
})

export default ColorSlider

