

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { FlatList, View, TouchableOpacity, Text, StyleSheet, PanResponder, Animated, Easing, ViewStyle, Dimensions, } from 'react-native';
import { Nullable } from '../types';


interface SliderProps {
    style?: ViewStyle | ViewStyle[]
}


const Slider = (props: SliderProps) => {
    const { style } = props

    const [viewBGColor, setViewBGColor] = useState('#FEFA25')
    const [width, setWidth] = useState<Nullable<number>>(null)
    const [switcherWidth, setSwticherWidth] = useState<Nullable<number>>(null)

    const pan = useRef(new Animated.Value(0)).current

    const panResponder = PanResponder.create({
        // onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (e, params) => {

            // console.log(params.x0)
        },

        onPanResponderMove: (e, { x0, dx, moveX, vx }) => {
            // console.log(e.nativeEvent.pageX)
            // console.log('moveX', moveX)
            // console.log('x0 ', x0)
            const widthSwitcher = width * 0.5

            if (x0 < (width / 2)) {
                if ((moveX - x0 + 20) < 0) {

                }
                else if ((moveX - x0 - 10) > widthSwitcher) {

                }
                else {
                    pan.setValue(moveX - x0)
                }

            } else {
                if (widthSwitcher + (moveX - x0) > widthSwitcher) {

                }
                else if (widthSwitcher + (moveX - x0) < -10) {

                }
                else {
                    pan.setValue(widthSwitcher + (moveX - x0))
                }

            }

        },

        // onPanResponderMove: Animated.event([
        //     null,
        //     { dx: pan }
        // ]),



        onPanResponderRelease: (e, { moveX, dx, vx, x0 }) => {

            if (Math.abs(vx) > 0.9 && dx >= 5 || moveX > 0.7*width) {
                // console.log('right')
                setViewBGColor('#25FE67')
                Animated.timing(pan, {
                    toValue: 0.5 * width,
                    duration: 400,
                    useNativeDriver: true,
                }
                ).start()
            }
            else {
                // console.log(pan)
                // console.log('left')
                setViewBGColor('#FEFA25')
                Animated.timing(pan, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }
                ).start()
            }
            // const screenWidth = Dimensions.get("window").width;
        }
    })


    return (
        <View style={[styles.ViewContainer, { backgroundColor: viewBGColor }, style]}
            onLayout={(e) => {
                setWidth(e.nativeEvent.layout.width)

            }}>

            <View style={{ flexDirection: 'row', }}>
                <Animated.View
                    onLayout={(e) => {
                        setSwticherWidth(e.nativeEvent.layout.width)

                    }}
                    style={[styles.ViewSlider, {
                        backgroundColor: '#25FEF6',
                        transform: [{ translateX: pan }]
                    }]}
                    {...panResponder.panHandlers}
                >
                    <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white' }}>Swipe</Text>
                </Animated.View>

                {/* <View style={styles.ViewSlider}></View> */}
            </View>
        </View>
    )
}

export default Slider;

const styles = StyleSheet.create({
    ViewContainer: {
        overflow: 'hidden',
        flexDirection: 'column-reverse',
        borderColor: '#006D77',
        borderRadius: 4,
        borderWidth: 2,
        height: 250
    },
    ViewSlider: {
        height: 100,
        borderWidth: 1,
        borderColor: '#006D77',
        width: '50%',
    }
})