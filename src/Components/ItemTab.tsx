import React from "react";
import { Dropdown, Col, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import useListTransform, {
  MapTransformer,
  TransformerParams,
} from "use-list-transform";
import { useEffectOnce, useSetState } from "react-use";
import fetchAsync from "../utils/Fetch";
import { months } from "../types/Dates";
import { toast } from "react-toastify";
import { AnimalCrossingMonthlyItem } from "../types/AHCN-API/Shared";
import { Loader } from "../components/Loader";
import { ApiUrl } from "../types/Urls";

interface ItemTabState<T> {
  items: T[];
  selectedItem?: string;
  loading: boolean;
}

interface ItemTabProps<T> {
  fetchUrl: string & ApiUrl;
  itemTypeName: "bug" | "fish" | "sea creature";
  itemCardBuilder: (item: T) => JSX.Element;
}

interface TransformData {
  month?: number;
}

export function ItemTab<T extends AnimalCrossingMonthlyItem>({
  fetchUrl,
  itemCardBuilder,
  itemTypeName,
}: ItemTabProps<T>) {
  const [state, setState] = useSetState<ItemTabState<T>>({
    loading: false,
    items: [],
  });

  useEffectOnce(() => {
    let isMounted = true;
    (async () => {
      try {
        setState({ loading: true });
        const items = fetchAsync<T[]>(fetchUrl);
        if (isMounted) setState({ items: await items });
      } catch (error) {
        toast.error("Error fetching items from " + fetchUrl);
      } finally {
        setState({ loading: false });
        return () => {
          isMounted = false;
          setState({ loading: false });
        };
      }
    })();
  });

  const filterByProperty: MapTransformer<T, TransformData> =
    (params: TransformerParams<T, TransformData>) => (item: T) => {
      if (params.data?.month) {
        return (
          (item["availability"]["month-array-northern"]?.indexOf(
            params.data.month
          ) ?? -1) >= 0
        );
      }
      return true;
    };

  const { transformed, setData, transformData } = useListTransform<
    TransformData,
    T
  >({
    list: state?.items ?? new Array<T>(),
    transform: [filterByProperty],
  });

  const searchRef = React.createRef<Typeahead<string>>();

  const itemNames =
    state.items && transformed.map((item) => item.name["name-EUen"]);

  const onMonthChange = (month?: number) => {
    setData({ month: month });
    setState({ selectedItem: undefined });
    searchRef.current && searchRef.current.clear && searchRef.current.clear();
    searchRef.current && searchRef.current.focus && searchRef.current.focus();
  };

  return state.loading ? (
    <Loader />
  ) : (
    state.items && (
      <>
        <Row className="mt-2 ml-auto mr-auto">
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                {(transformData?.month &&
                  months.find((m) => m[0] === transformData.month)?.[1]) ??
                  "All"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-scroll">
                <Dropdown.Item onClick={() => onMonthChange(undefined)}>
                  All
                </Dropdown.Item>
                {months.map((month, i) => (
                  <Dropdown.Item
                    onClick={() => onMonthChange(month[0])}
                    key={i + "-menuItem"}
                  >
                    {month[1].toString()}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Typeahead
              ref={searchRef}
              id={`${itemTypeName} search`}
              onChange={(selected) =>
                setState({
                  selectedItem: selected[0]?.toString(),
                })
              }
              options={itemNames}
              placeholder={`Choose a ${itemTypeName}...`}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            {state.selectedItem &&
              state.items
                .filter((item) => item.name["name-EUen"] === state.selectedItem)
                .map(itemCardBuilder)}
          </Col>
        </Row>
      </>
    )
  );
}
