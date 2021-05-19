import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { SeaCreature } from "../../types/AHCN-API/SeaCreature";
import { StarButton } from "../StarButton";

export const SeaCreatureCard = (seaCreature: SeaCreature) => (
  <Card className="text-center" key={seaCreature.id}>
    <Card.Title>
      {seaCreature.name["name-EUen"]}{" "}
      <img alt="Fish Icon" className="icon ml-2" src={seaCreature.icon_uri} />
    </Card.Title>
    <div className="text-center ml-auto mr-auto">
      <Card.Img
        alt="Fish Photo"
        style={{ height: 200, width: 400 }}
        variant="top"
        src={seaCreature.image_uri}
      />
    </div>
    <ListGroup className=" mt-2 list-group-flush">
      <ListGroupItem>
        Museum Phrase: {seaCreature["museum-phrase"]}
      </ListGroupItem>
      <ListGroupItem>Price: {seaCreature.price}</ListGroupItem>
      <ListGroupItem>Speed: {seaCreature.speed}</ListGroupItem>
      <ListGroupItem>Catch Phrase: {seaCreature["catch-phrase"]}</ListGroupItem>
      <ListGroupItem>
        Availability: {JSON.stringify(seaCreature.availability)}
      </ListGroupItem>
    </ListGroup>
    <Card.Footer>
      <StarButton
        itemInfo={{
          itemLookupId: seaCreature.id.toString(),
          itemType: "sea",
        }}
      />
    </Card.Footer>
  </Card>
);
