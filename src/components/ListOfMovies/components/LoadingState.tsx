import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import { MaskedShimmer } from "@components/MaskedShimmer";

const ROW_SIZE = 120;
const GAP = 12;

export const LoadingState = () => {
  const { height: screenHeight } = useWindowDimensions();
  const height = useHeaderHeight();

  const NUMBER_OF_ROWS = Math.floor((screenHeight - height) / (ROW_SIZE + GAP));

  return (
    <MaskedShimmer style={styles.maskedShimmer}>
      <View style={styles.MovieBlockSkeletonWrapper}>
        {Array(NUMBER_OF_ROWS)
          .fill(0)
          .map((_, i) => (
            <View
              style={styles.MovieBlockSkeletonItem}
              key={`loading-state-items-${i}`}
            />
          ))}
      </View>
    </MaskedShimmer>
  );
};

const styles = StyleSheet.create({
  maskedShimmer: {
    flex: 1,
    margin: 20,
  },
  MovieBlockSkeletonWrapper: {
    flex: 1,
    gap: GAP,
  },
  MovieBlockSkeletonItem: {
    height: ROW_SIZE,
    backgroundColor: "white",
  },
});
