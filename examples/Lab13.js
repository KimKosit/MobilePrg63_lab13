import React, { useRef } from 'react'
import { Animated, PanResponder, StyleSheet, View } from 'react-native'

const Lab13 = () => {
    const pan = useRef(new Animated.ValueXY()).current
    const scale = useRef(new Animated.Value(1)).current

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value,
            })
            pan.setValue({ x: 0, y: 0 })
        },
        onPanResponderMove: (evt, gestureState) => {
            const touches = evt.nativeEvent.touches
            if (touches.length >= 2){
                // let dx =
                //   evt.nativeEvent.touches[0].locationX -
                //   evt.nativeEvent.touches[1].locationX;

                // dx = Math.abs(dx);

                // let s = dx / 80;

                // if (s >= 1) {
                //   scale.setValue(s);
                // }

                let x1 = evt.nativeEvent.touches[0].pageX
                let y1 = evt.nativeEvent.touches[0].pageY
                let x2 = evt.nativeEvent.touches[1].pageX
                let y2 = evt.nativeEvent.touches[1].pageY

                let d = Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2))

                let distance = d / 100

                // console.log(d)
                // console.log(distance)

                if (distance >= 1){
                    scale.setValue(distance)
                }
            }else{
                pan.setValue({ x: gestureState.dx, y: gestureState.dy })
            }
        },
        onPanResponderRelease: () => {
            pan.flattenOffset()
            Animated.spring(scale, {
                toValue: 1,
                friction: 6,
                useNativeDriver: false,
            }).start()
        },
    })

return (
    <View style={styles.container}>
      <Animated.Image
        {...panResponder.panHandlers}
        style={[
          pan.getLayout(),
          styles.image,
          { transform: [{ scale: scale }] },
        ]}
        source={require("../assets/IT_KMITL_Logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 89.3,
    height: 74.4,
  },
});

export default Lab13;
