import React from "react";
import {
  Dropdown,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import useListTransform, {
  MapTransformer,
  TransformerParams,
} from "use-list-transform";
import { HousewareItem } from "../types/AHCN-API/HousewareItem";
import { distinctProperty } from "../utils/Array";
import { useEffectOnce, useSetState } from "react-use";
import fetchAsync from "../utils/Fetch";
import { Loader } from "../components/Loader";
import { toast } from "react-toastify";
import { ApiUrl } from "../types/Urls";
import { WallmountedItem } from "../types/AHCN-API/WallmountedItem";

interface ItemState {
  items: WallmountedItem[];
  selectedItem?: string;
  loading: boolean;
}

interface TransformData {
  tag?: string;
  source?: string;
}

export const WallmountedItemTab = () => {
  const [state, setState] = useSetState<ItemState>({
    loading: false,
    items: [],
  });
  useEffectOnce(() => {
    let isMounted = true;
    (async () => {
      try {
        setState({ loading: true });
        const items = fetchAsync<WallmountedItem[][]>(ApiUrl.Wallmounted);
        if (isMounted) setState({ items: (await items).flat() });
      } catch (error) {
        toast.error("Error getting houseware items");
      } finally {
        setState({ loading: false });
      }
    })();
    return () => {
      isMounted = false;
      setState({ loading: false });
    };
  });

  const filterByTag: MapTransformer<HousewareItem, TransformData> =
    (params: TransformerParams<HousewareItem, TransformData>) =>
    (item: HousewareItem) => {
      if (params.data?.tag) {
        return (
          (item.tag?.toLowerCase().indexOf(params.data.tag?.toLowerCase()) ??
            -1) >= 0
        );
      }
      return true;
    };

  const filterBySource: MapTransformer<HousewareItem, TransformData> =
    (params: TransformerParams<HousewareItem, TransformData>) =>
    (item: HousewareItem) => {
      if (params.data?.source) {
        return (
          (item.source
            ?.toLowerCase()
            .indexOf(params.data.source?.toLowerCase()) ?? -1) >= 0
        );
      }
      return true;
    };

  const { transformed, setData, transformData } = useListTransform<
    TransformData,
    HousewareItem
  >({
    list: state?.items ?? new Array<HousewareItem>(),
    transform: [filterByTag, filterBySource],
    onLoading: (loading) => setState({ loading: loading }),
  });

  const searchRef = React.createRef<Typeahead<string>>();

  const itemNames =
    state.items &&
    distinctProperty(
      transformed?.map(
        (item) => `${item.variant ?? ""} ${item.name["name-EUen"]}` ?? "Unknown"
      ),
      (item) => item
    );

  const tags = state.items && distinctProperty(state.items, (item) => item.tag);

  const sources =
    state.items && distinctProperty(state.items, (item) => item.source);

  const onTagChange = (type?: string) => {
    setData({ tag: type, source: transformData?.source });
    setState({ selectedItem: undefined });
    searchRef.current && searchRef.current.clear && searchRef.current.clear();
    searchRef.current && searchRef.current.focus && searchRef.current.focus();
  };

  const onSourceChange = (type?: string) => {
    setData({ source: type, tag: transformData?.tag });
    setState({ selectedItem: undefined });
    searchRef.current && searchRef.current.clear && searchRef.current.clear();
    searchRef.current && searchRef.current.focus && searchRef.current.focus();
  };
  return state.loading ? (
    <Loader />
  ) : (
    state.items && tags && sources && (
      <>
        <Row className="mt-2 ml-auto mr-auto">
          <Col>
            <ButtonGroup>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  {transformData?.source?.replaceAll(";", " &") ??
                    "All Sources"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-scroll">
                  <Dropdown.Item onClick={() => onSourceChange(undefined)}>
                    All
                  </Dropdown.Item>
                  {sources.map((source, i) => (
                    <Dropdown.Item
                      onClick={() => onSourceChange(source)}
                      key={`${source}-${i}`}
                    >
                      {source.replaceAll(";", " &")}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  {transformData?.tag ?? "All Tags"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-scroll">
                  <Dropdown.Item onClick={() => onTagChange(undefined)}>
                    All
                  </Dropdown.Item>
                  {tags.map((tag) => (
                    <Dropdown.Item onClick={() => onTagChange(tag)} key={tag}>
                      {tag}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
          </Col>
          <Col>
            <Typeahead
              ref={searchRef}
              id="Houseware Item Search"
              onChange={(selected) =>
                setState({
                  selectedItem: selected[0]?.toString(),
                })
              }
              options={itemNames}
              placeholder="Choose an item..."
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            {state.selectedItem &&
              state.items
                .filter(
                  (item) =>
                    `${item.variant ?? ""} ${item.name["name-EUen"]}` ===
                    state.selectedItem
                )
                .map((item, i) => (
                  <Card
                    className="text-center"
                    key={`${i}-${item.name["name-EUen"]}`}
                  >
                    <Card.Title>{item.name["name-EUen"]} </Card.Title>
                    <div className="text-center ml-auto mr-auto">
                      <Card.Img
                        alt="Villager Photo"
                        className="card-image"
                        variant="top"
                        src={item.image_uri}
                      />
                    </div>
                    <ListGroup className=" mt-2 list-group-flush">
                      <ListGroupItem>Size: {item.size}</ListGroupItem>
                      <ListGroupItem>
                        Pattern: {item.pattern?.toString() ?? "unknown"}
                      </ListGroupItem>
                      <ListGroupItem>Source: {item.source}</ListGroupItem>
                      <ListGroupItem>
                        Sell Price: {item["sell-price"]}
                      </ListGroupItem>
                      <ListGroupItem>
                        Variant: {item.variant?.toString() ?? "unknown"}
                      </ListGroupItem>
                      <ListGroupItem>Size: {item.size}</ListGroupItem>
                      <ListGroupItem>
                        Interactive: {item.isInteractive.toString()}
                      </ListGroupItem>
                      <ListGroupItem>
                        Buy Price: {item["buy-price"]}
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
