import React, { FC } from "react";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";
import Config from "react-native-config";

type PosterProps = {
  poster_path: string;
};

export const Poster: FC<Omit<ImageProps, "source"> & PosterProps> = ({ poster_path, ...props }) => (
  <>
    {poster_path ? (
      <Image
        {...props}
        source={{
          uri: `${Config.POSTER_URL_BASE}${poster_path}`,
        }}
      />
    ) : (
      <View style={styles.noImage}>
        <Text style={styles.icon}>🎬</Text>
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  noImage: {
    padding: 8,
  },
  icon: {
    fontSize: 48,
  },
});
