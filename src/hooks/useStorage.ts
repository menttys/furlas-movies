import { useStore } from "@/state/state";

type Listitem<T> = T & { id: number };

export function useStorage() {
  // It would be nice to store the values in memory and only persist them when the app is closed
  // but for the sake of this example decided to use the storage directly
  const { storage } = useStore();

  //TODO: Implement the setItem function
  function setItem<T>(key: string, values: Listitem<T>) {}

  function setListItems<T>(key: string, values: Listitem<T>) {
    let newValueList = [values];
    const storedValues = storage.getString(key);
    const parsedList = storedValues ? JSON.parse(storedValues) : null;
    const doesItemExist = parsedList?.find(
      (item: Listitem<T>) => item.id === values.id,
    );

    if (parsedList && !doesItemExist) {
      newValueList = [...parsedList, values];
    }
    storage.set(key, JSON.stringify(newValueList));
  }

  function getListItem<T>(key: string, itemId: number): boolean {
    const list = storage.getString(key);
    if (!list) {
      return false;
    }
    const parsedList = JSON.parse(list);

    return parsedList.find((item: Listitem<T>) => item.id === itemId);
  }

  function getItem(key: string): string | undefined {
    return storage.getString(key);
  }

  function getAllItems(key: string) {
    const list = storage.getString(key);
    if (!list) {
      return [];
    }
    const parsedList = JSON.parse(list);
    parsedList.id = `${parsedList.id}`;

    return JSON.parse(list);
  }

  // TODO: Implement the removeItem function
  const removeItem = (key: string) => {};

  function removeItemFromList<T>(key: string, itemId: number) {
    const list = storage.getString(key);
    if (!list) {
      return;
    }

    const parsedList = JSON.parse(list);
    const newList = parsedList.filter(
      (item: Listitem<T>) => item.id !== itemId,
    );
    storage.set(key, JSON.stringify(newList));
  }

  return {
    setItem,
    setListItems,
    getItem,
    getListItem,
    getAllItems,
    removeItem,
    removeItemFromList,
  };
}
