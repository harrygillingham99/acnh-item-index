import { ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffectOnce } from "react-use";
import useSetState from "react-use/lib/useSetState";
import StarContainer from "../state/StarContainer";
import { Bug } from "../types/AHCN-API/Bug";
import { Fish } from "../types/AHCN-API/Fish";
import { SeaCreature } from "../types/AHCN-API/SeaCreature";
import { Villager } from "../types/AHCN-API/Villager";
import fetchAsync from "../utils/Fetch";
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
  const [state, setState] = useSetState<StarredState>({
    loading: false,
    villagers: [],
    bugs: [],
    fish: [],
    seaCreature: [],
  });

  useEffectOnce(() => {
    if (!items) return;
    (async () => {
      try {
        setState({ loading: true });
        for (let index = 0; index < items.items.length; index++) {
          const { itemType, itemLookupId } = items.items[index];
          const item = await fetchAsync(
            `http://acnhapi.com/v1/${itemType}/${itemLookupId}`
          );
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
  });

  return !state.loading ? (
    <ListGroup variant="flush">
      {state.bugs.length > 0 ? (
        state.bugs.map((bug, i) => (
          <ListGroup.Item key={`bug-${i}`}>
            <img className="icon-starred" src={bug.icon_uri} />{" "}
            {bug.name["name-EUen"]}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>No Bugs</ListGroup.Item>
      )}
      {state.villagers.length > 0 ? (
        state.villagers.map((villager, i) => (
          <ListGroup.Item key={`villager-${i}`}>
            <img className="icon-starred" src={villager.icon_uri} />
            {villager.name["name-EUen"]}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>No Villagers</ListGroup.Item>
      )}
      {state.fish.length > 0 ? (
        state.fish.map((fish, i) => (
          <ListGroup.Item key={`fish-${i}`}>
            <img className="icon-starred" src={fish.icon_uri} />
            {fish.name["name-EUen"]}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>No Fish</ListGroup.Item>
      )}
      {state.seaCreature.length > 0 ? (
        state.seaCreature.map((sea, i) => (
          <ListGroup.Item key={`sea-${i}`}>
            <img className="icon-starred" src={sea.icon_uri} />
            {sea.name["name-EUen"]}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>No Sea Creatures</ListGroup.Item>
      )}
    </ListGroup>
  ) : (
    <Loader />
  );
};
