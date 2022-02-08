import React, { useState, useRef } from 'react'
import { View, Animated, ViewStyle, StyleSheet } from 'react-native'


// const useAnimateItemStyle =()=>{

//     const [isStart, setIsStart] = useState(false);

// }

interface LoadingAnimProps {
    style?: ViewStyle | ViewStyle[];
}

const LoadingAnim = (props: LoadingAnimProps) => {

    const { style } = props;

    const [animationWidth, setAnimationWidth] = useState(0);

    const animateState = {
        start: 0,
        end: 100,
    }

    // const animateStateColor = {
    //     start:0,
    //     end:100,
    // }
    const animateStateColor = {
        start: 0,
        S1: 200,
        S2: 400,
        S3: 600,
        S4: 800,
        end: 1000,
    }

    const value1 = useRef(new Animated.Value(animateState.start)).current;

    const colorValue = useRef(new Animated.Value(animateStateColor.start)).current;

    const onStart = () => {
        Animated.loop(
            Animated.timing(value1, {
                toValue: animateState.end,
                duration: 3000,
                useNativeDriver: true,
            }),
        ).start();
  
    }

    const onStartChangeColor = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(colorValue, {
                    toValue: animateStateColor.end,
                    duration: 30000,
                    useNativeDriver: false,
                }),
            ])

        ).start();
    }

    const inputRange = [animateState.start, animateState.end]
    const translateX1 = value1.interpolate({ inputRange, outputRange: [ -0.2*animationWidth, 1.2 * animationWidth] })

    // const inputRangeColor = [animateStateColor.start,animateStateColor.end];
    const inputRangeColor = [animateStateColor.start, animateStateColor.S1, animateStateColor.S2, animateStateColor.S3, animateStateColor.S4, animateStateColor.end];
    const color = colorValue.interpolate({ inputRange: inputRangeColor, outputRange: ['#FE2525', '#FEE725', '#3FFE25', '#25FEE9', '#2540FE', '#FE25F4'] })

    return (
        <View style={style}>
            <Animated.View style={[styles.ViewContainer, { borderColor: color }]}
                onLayout={(e) => {
                    setAnimationWidth(e.nativeEvent.layout.width);
                    onStart();

                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={[styles.AnimView, {
                        transform: [{ translateX: translateX1 }],

                    }]}>
                        <Animated.View
                            onLayout={() => {
                                onStartChangeColor();
                            }}
                            style={[styles.AnimView, { backgroundColor: color, width: '100%' }]}
                        >
                           
                        </Animated.View>
                    </Animated.View>

                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    ViewContainer: {
        overflow: 'hidden',
        borderColor: '#006D77',
        borderWidth: 1,
        borderRadius: 3,
        height: 20,
    },
    AnimView: {
        // position: 'absolute',
        borderRadius: 3,
        height: 20,
        width: '20%',
        // backgroundColor: '#5CD882',
    }
})

export default LoadingAnim