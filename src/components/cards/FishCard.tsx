import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Fish } from "../../types/AHCN-API/Fish";
import { StarButton } from "../StarButton";

export const FishCard = (fish: Fish) => {
  return (
    <Card className="text-center" key={fish.id}>
      <Card.Title>
        {fish.name["name-EUen"]}{" "}
        <img alt="Fish Icon" className="icon ml-2" src={fish.icon_uri} />
      </Card.Title>
      <div className="text-center ml-auto mr-auto">
        <Card.Img
          alt="Fish Photo"
          style={{ height: 200, width: 400 }}
          variant="top"
          src={fish.image_uri}
        />
      </div>
      <ListGroup className=" mt-2 list-group-flush">
        <ListGroupItem>Museum Phrase: {fish["museum-phrase"]}</ListGroupItem>
        <ListGroupItem>Price: {fish.price}</ListGroupItem>
        <ListGroupItem>CJ Price: {fish["price-cj"]}</ListGroupItem>
        <ListGroupItem>Rarity: {fish.availability.rarity}</ListGroupItem>
        <ListGroupItem>Catch Phrase: {fish["catch-phrase"]}</ListGroupItem>
        <ListGroupItem>
          Availability: {JSON.stringify(fish.availability)}
        </ListGroupItem>
      </ListGroup>
      <Card.Footer>
        <StarButton
          itemInfo={{
            itemLookupId: fish.id.toString(),
            itemType: "fish",
          }}
        />
      </Card.Footer>
    </Card>
  );
};
