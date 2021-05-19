import { useLocalStorage, useSetState } from "react-use";
import { createContainer } from "unstated-next";
import { StarredItem, StarredItems } from "../types/StarredItem";

const useStarContainer = () => {
  const [value, setValue, remove] = useLocalStorage<StarredItems>(
    "acnh-starred",
    { items: new Array<StarredItem>() }
  );

  const [starred, setStarred] = useSetState<StarredItems>(
    value ?? { items: new Array<StarredItem>() }
  );

  const starItem = (i: StarredItem) => {
    setStarred((prev) => {
      const oldState = prev;
      oldState.items = oldState.items ? [...oldState.items, i] : [i];
      setValue(oldState);
      return oldState;
    });
  };

  const removeItem = (i: StarredItem) => {
    setStarred((prev) => {
      const oldState = prev;
      oldState.items = oldState.items?.filter((item) => !isEqual(item, i));
      setValue(oldState);
      return oldState;
    });
  };

  const clear = () => remove();

  const isStarred = (i: StarredItem) =>
    starred.items &&
    (starred.items.findIndex((item) => isEqual(item, i)) >= 0 ?? false);

  const isEqual = (a: StarredItem, b: StarredItem) =>
    a.itemLookupId === b.itemLookupId && a.itemType === b.itemType;

  return { starItem, removeItem, clear, isStarred, items: starred };
};

export default createContainer(useStarContainer);
