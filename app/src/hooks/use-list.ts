import { useState, useCallback, useEffect, useMemo } from "react";
import useLocalStorage from "../utils/storage";
import fakeFetchData from "../api/data";

interface IUseList {
  searchText: string;
  initialSelected?: number[];
}

export default function useList({ searchText, initialSelected }: IUseList) {
  const [items, setItems] = useState<Map<number, Item>>(new Map());
  const [isError, setError] = useState(false);

  const [selectedItems, setSelectedItem] = useLocalStorage({
    key: "persist_selected",
    initialValue: Array.from(initialSelected ?? []),
  });

  const handleItemToggle = useCallback(
    (itemId: number) => () => setSelectedItem(itemId),
    [setSelectedItem]
  );

  useEffect(() => {
    fakeFetchData()
      .then((itemsData) => new Map(itemsData.map((item) => [item.id, item])))
      .then(setItems)
      .catch(setError);
  }, []);

  const listItems = useMemo<Item[]>(() => {
    return Array.from(selectedItems)
      .map((item) => ({
        ...items.get(item)!,
        checked: true,
      }))
      .concat(
        Array.from(items.values()).filter(
          ({ id, title }) =>
            !selectedItems.has(id) &&
            title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
  }, [items, searchText, selectedItems]);

  return {
    isError,
    listItems,
    handleItemToggle,
    isLoading: items.size === 0,
  };
}
