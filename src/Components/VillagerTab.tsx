import React from "react";
import {
  Dropdown,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import useListTransform, {
  MapTransformer,
  TransformerParams,
} from "use-list-transform";
import { Villager } from "../types/AHCN-API/Villager";
import { distinctProperty } from "../utils/Array";
import { useEffectOnce, useSetState } from "react-use";
import fetchAsync from "../utils/Fetch";
import { Loader } from "./Loader";

interface VillagerState {
  villagers: Villager[];
  selectedVillager?: string;
  loading: boolean;
}

interface TransformData {
  species?: string;
  gender?: string;
}

export const VillagerTab = () => {
  const [state, setState] = useSetState<VillagerState>({
    loading: false,
    villagers: [],
  });
  useEffectOnce(() => {
    let isMounted = true;
    (async () => {
      try {
        setState({ loading: true });
        var villagers = fetchAsync<Villager[]>(
          "http://acnhapi.com/v1a/villagers"
        );
        if (isMounted) setState({ villagers: await villagers });
      } catch (error) {
      } finally {
        setState({ loading: false });
      }
    })();
    return () => {
      isMounted = false;
      setState({ loading: false });
    };
  });
  const filterByProperty: MapTransformer<Villager, TransformData> =
    (params: TransformerParams<Villager, TransformData>) =>
    (item: Villager) => {
      if (params.data?.species) {
        return (
          (item.species
            ?.toLowerCase()
            .indexOf(params.data.species!.toLowerCase()) ?? -1) >= 0
        );
      }
      return true;
    };

  const { transformed, setData, transformData } = useListTransform<
    TransformData,
    Villager
  >({
    list: state?.villagers ?? new Array<Villager>(),
    transform: [filterByProperty],
  });

  let searchRef = React.createRef<Typeahead<string>>();

  const villagerNames =
    state.villagers &&
    transformed.map((villager) => villager.name["name-EUen"]);

  const species =
    state.villagers &&
    distinctProperty(state.villagers, (villager) => villager.species);

  const onSpeciesChange = (type?: string) => {
    setData({ species: type });
    setState({ selectedVillager: undefined });
    searchRef.current && searchRef.current.clear && searchRef.current.clear();
    searchRef.current && searchRef.current.focus && searchRef.current.focus();
  };

  return state.loading ? (
    <Loader />
  ) : (
    state.villagers && species && (
      <>
        <Row className="mt-2 ml-auto mr-auto">
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                {transformData?.species ?? "All Species"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-scroll">
                <Dropdown.Item onClick={() => onSpeciesChange(undefined)}>
                  All
                </Dropdown.Item>
                {species.map((type) => (
                  <Dropdown.Item
                    onClick={() => onSpeciesChange(type)}
                    key={type}
                  >
                    {type}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Typeahead
              ref={searchRef}
              id="Villager Search"
              onChange={(selected) =>
                setState({
                  selectedVillager: selected[0]?.toString(),
                })
              }
              options={villagerNames}
              placeholder="Choose a villager..."
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            {state.selectedVillager &&
              state.villagers
                .filter(
                  (villager) =>
                    villager.name["name-EUen"] === state.selectedVillager
                )
                .map((villager) => (
                  <Card className="text-center" key={villager.id}>
                    <Card.Title>
                      {villager.name["name-EUen"]}{" "}
                      <img
                        alt="Villager Icon"
                        className="icon ml-2"
                        src={villager.icon_uri}
                      />
                    </Card.Title>
                    <div className="text-center ml-auto mr-auto">
                      <Card.Img
                        alt="Villager Photo"
                        className="card-image"
                        variant="top"
                        src={villager.image_uri}
                      />
                    </div>
                    <ListGroup className=" mt-2 list-group-flush">
                      <ListGroupItem>
                        Personality: {villager.personality}
                      </ListGroupItem>
                      <ListGroupItem>Hobby: {villager.hobby}</ListGroupItem>
                      <ListGroupItem>Saying: {villager.saying}</ListGroupItem>
                      <ListGroupItem>Species: {villager.species}</ListGroupItem>
                      <ListGroupItem>
                        Sub type: {villager.subtype}
                      </ListGroupItem>
                      <ListGroupItem>Gender: {villager.gender}</ListGroupItem>
                      <ListGroupItem>
                        Birthday: {villager.birthday}
                      </ListGroupItem>
                      <ListGroupItem>
                        Catch phrase: {villager["catch-phrase"]}
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                ))}
          </Col>
        </Row>
      </>
    )
  );
};
