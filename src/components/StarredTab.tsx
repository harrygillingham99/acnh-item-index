import React from "react";
import { ListGroup, Row } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useEffectOnce } from "react-use";
import useSetState from "react-use/lib/useSetState";
import StarContainer from "../state/StarContainer";
import { Bug } from "../types/AHCN-API/Bug";
import { Fish } from "../types/AHCN-API/Fish";
import { SeaCreature } from "../types/AHCN-API/SeaCreature";
import { Villager } from "../types/AHCN-API/Villager";
import fetchAsync from "../utils/Fetch";
import { titleCaseWord } from "../utils/String";
import { Loader } from "./Loader";

interface StarredState {
  villagers: Villager[];
  bugs: Bug[];
  fish: Fish[];
  seaCreature: SeaCreature[];
  loading: boolean;
}

export const StarredTab = () => {
  const { items } = StarContainer.useContainer();
  const initialState = {
    loading: false,
    villagers: [],
    bugs: [],
    fish: [],
    seaCreature: [],
  };
  const [state, setState] = useSetState<StarredState>(initialState);
  useEffectOnce(() => {
    let isMounted = true;
    if (!items) return;
    (async () => {
      try {
        setState({ loading: true });
        for (let index = 0; index < items.items.length; index++) {
          const { itemType, itemLookupId } = items.items[index];
          const item =
            isMounted &&
            (await fetchAsync(
              `http://acnhapi.com/v1/${itemType}/${itemLookupId}`
            ));
          isMounted &&
            setState((prev) => {
              const oldState = prev;
              switch (itemType) {
                case "bugs":
                  const bugs = [...oldState.bugs, item as Bug];
                  return { bugs: bugs };
                case "fish":
                  const fish = [...oldState.fish, item as Fish];
                  return { fish: fish };
                case "villagers":
                  const villagers = [...oldState.villagers, item as Villager];
                  return { villagers: villagers };
                case "sea":
                  const sea = [...oldState.seaCreature, item as SeaCreature];
                  return { seaCreature: sea };
              }
            });
        }
      } catch (error) {
        toast.error("Error getting starred items");
      } finally {
        setState({ loading: false });
      }
    })();
    return () => {
      isMounted = false;
      setState(initialState);
    };
  });
  const starredListItem = ({
    topLine,
    bottomLine,
    iconUri,
    i,
  }: {
    topLine: string;
    bottomLine: string;
    iconUri: string;
    i: number;
  }) => (
    <ListGroup.Item className="p-1" key={`listItem-${i}`}>
      <Row>
        <img className="icon mr-2 mt-2" src={iconUri} />
        <div>
          <p className="mb-0">{topLine}</p>
          <p className="mb-0">{bottomLine}</p>
        </div>
      </Row>
    </ListGroup.Item>
  );
  const emptyListItem = (emptyItem: string) => (
    <ListGroup.Item className="p-1">
      <X className="mr-2 icon" />
      No {emptyItem}
    </ListGroup.Item>
  );
  return !state.loading ? (
    <ListGroup variant="flush">
      {state.bugs.length > 0
        ? state.bugs.map((bug, i) =>
            starredListItem({
              topLine: `${bug.name["name-EUen"]}: ${bug["catch-phrase"]}`,
              bottomLine: `Price: ${bug.price}`,
              iconUri: bug.icon_uri,
              i: i,
            })
          )
        : emptyListItem("Bugs")}
      {state.villagers.length > 0
        ? state.villagers.map((villager, i) =>
            starredListItem({
              topLine: `${villager.name["name-EUen"]}: ${villager.personality}`,
              bottomLine: `Birthday: ${villager["birthday-string"]}`,
              iconUri: villager.icon_uri,
              i: i,
            })
          )
        : emptyListItem("Villagers")}
      {state.fish.length > 0
        ? state.fish.map((fish, i) =>
            starredListItem({
              topLine: `${titleCaseWord(fish.name["name-EUen"])}: ${
                fish["catch-phrase"]
              }`,
              bottomLine: `Price: ${fish.price}`,
              iconUri: fish.icon_uri,
              i: i,
            })
          )
        : emptyListItem("Fish")}
      {state.seaCreature.length > 0
        ? state.seaCreature.map((sea, i) =>
            starredListItem({
              topLine: `${sea.name["name-EUen"]}: ${sea["catch-phrase"]}`,
              bottomLine: `Price: ${sea.price}`,
              iconUri: sea.icon_uri,
              i: i,
            })
          )
        : emptyListItem("Sea Creatures")}
    </ListGroup>
  ) : (
    <Loader />
  );
};
