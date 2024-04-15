import React from "react";
import type { ReactElement } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import type { ViewStyle, StyleProp } from "react-native";

import GradientShimmer from "react-native-gradient-shimmer";
import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = {
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
  shimmerOpacity?: number;
};

export const MaskedShimmer = ({ children, style, opacity = 0.2, shimmerOpacity = 0.2 }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, style]} testID="masked-shimmer">
      <MaskedView maskElement={children}>
        <GradientShimmer
          testID="skeleton-shimmer"
          LinearGradientComponent={LinearGradient}
          width={width}
          height={height}
          highlightWidth={300}
          style={{ opacity: shimmerOpacity }}
          backgroundColor="#999"
          highlightColor="black"
        />
      </MaskedView>
      <View
        testID="skeleton-child-wrapper"
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
        }}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
