import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Bug } from "../../types/AHCN-API/Bug";
import { StarButton } from "../StarButton";

export const BugCard = (bug: Bug) => (
  <Card className="text-center" key={bug.id}>
    <Card.Title>
      {bug.name["name-EUen"]}{" "}
      <img alt="Bug Icon" className="icon ml-2" src={bug.icon_uri} />
    </Card.Title>
    <div className="text-center ml-auto mr-auto">
      <Card.Img
        alt="Bug Photo"
        className="card-image"
        variant="top"
        src={bug.image_uri}
      />
    </div>
    <ListGroup className=" mt-2 list-group-flush">
      <ListGroupItem>Museum Phrase: {bug["museum-phrase"]}</ListGroupItem>
      <ListGroupItem>Price: {bug.price}</ListGroupItem>
      <ListGroupItem>Flick Price: {bug["price-flick"]}</ListGroupItem>
      <ListGroupItem>Rarity: {bug.availability.rarity}</ListGroupItem>
      <ListGroupItem>Catch Phrase: {bug["catch-phrase"]}</ListGroupItem>
      <ListGroupItem>
        Availability: {JSON.stringify(bug.availability)}
      </ListGroupItem>
    </ListGroup>
    <Card.Footer>
      <StarButton
        itemInfo={{
          itemLookupId: bug.id.toString(),
          itemType: "bugs",
        }}
      />
    </Card.Footer>
  </Card>
);
