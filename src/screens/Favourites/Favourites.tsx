import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useStorage } from "@hooks/useStorage";
import { storageNames } from "@constants/index";
import { ListOfMovies } from "@components/ListOfMovies";

export const MOVIE_LIST_TEST_ID = "movielist-test-id";
export const BUTTON_A11Y_LABEL = "movie button to:";

export const Favourite = () => {
  const { getAllItems } = useStorage();
  const [data, setData] = useState([...getAllItems(storageNames.favourites)]);

  useFocusEffect(
    useCallback(() => {
      setData([...getAllItems(storageNames.favourites)]);
    }, []),
  );

  return <ListOfMovies data={data} loading={false} />;
};
