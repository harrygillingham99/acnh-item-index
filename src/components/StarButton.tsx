import { useState } from "react";
import { Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import StarContainer from "../state/StarContainer";
import { StarredItem } from "../types/StarredItem";

export const StarButton = (props: { itemInfo: StarredItem }) => {
  const { starItem, removeItem, isStarred } = StarContainer.useContainer();
  const [starred, setStarred] = useState(isStarred(props.itemInfo));

  const onPress = () => {
    setStarred(!starred);
    isStarred(props.itemInfo)
      ? removeItem(props.itemInfo)
      : starItem(props.itemInfo);
  };

  return (
    <Button size="sm" variant="info" onClick={() => onPress()}>
      {starred ? <StarFill /> : <Star />}
    </Button>
  );
};
