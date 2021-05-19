import useSetState from "react-use/lib/useSetState";
import { Container, Tabs, Tab } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { VillagerTab } from "./components/VillagerTab";
import { ItemTab } from "./components/ItemTab";
import { FishCard } from "./components/cards/FishCard";
import { SeaCreatureCard } from "./components/cards/SeaCreatureCard";
import { BugCard } from "./components/cards/BugCard";
import { HousewareTab } from "./components/HousewareTab";
import { ApiUrl } from "./types/Urls";
import { WallmountedItemTab } from "./components/WallmountedItemTab";
import StarContainer from "./state/StarContainer";
import { StarredTab } from "./components/StarredTab";

interface AppState {
  activeTab: TabNames;
}

enum TabNames {
  Villagers = "Villagers",
  Fish = "Fish",
  Bugs = "Bugs",
  SeaCreatures = "Sea Creatures",
  Houseware = "Houseware",
  Wallmounted = "Wallmounted Items",
  Starred = "Starred",
}

export default function App() {
  const [state, setState] = useSetState<AppState>({
    activeTab: TabNames.Villagers,
  });
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Container className="mt-2">
        <StarContainer.Provider>
          <Tabs
            activeKey={state.activeTab}
            onSelect={(key) => setState({ activeTab: key as TabNames })}
          >
            <Tab eventKey={TabNames.Villagers} title={TabNames.Villagers}>
              {state.activeTab === TabNames.Villagers && <VillagerTab />}
            </Tab>
            <Tab eventKey={TabNames.Fish} title={TabNames.Fish}>
              {state.activeTab === TabNames.Fish && (
                <ItemTab
                  fetchUrl={ApiUrl.Fish}
                  itemTypeName="fish"
                  itemCardBuilder={FishCard}
                />
              )}
            </Tab>
            <Tab eventKey={TabNames.Bugs} title={TabNames.Bugs}>
              {state.activeTab === TabNames.Bugs && (
                <ItemTab
                  fetchUrl={ApiUrl.Bugs}
                  itemTypeName="bug"
                  itemCardBuilder={BugCard}
                />
              )}
            </Tab>
            <Tab eventKey={TabNames.SeaCreatures} title={TabNames.SeaCreatures}>
              {state.activeTab === TabNames.SeaCreatures && (
                <ItemTab
                  fetchUrl={ApiUrl.SeaCreatures}
                  itemTypeName="sea creature"
                  itemCardBuilder={SeaCreatureCard}
                />
              )}
            </Tab>
            <Tab eventKey={TabNames.Houseware} title={TabNames.Houseware}>
              {state.activeTab === TabNames.Houseware && <HousewareTab />}
            </Tab>
            <Tab eventKey={TabNames.Wallmounted} title={TabNames.Wallmounted}>
              {state.activeTab === TabNames.Wallmounted && (
                <WallmountedItemTab />
              )}
            </Tab>
            <Tab
              tabClassName="ml-auto"
              eventKey={TabNames.Starred}
              title={TabNames.Starred}
            >
              {state.activeTab === TabNames.Starred && <StarredTab />}
            </Tab>
          </Tabs>
        </StarContainer.Provider>
      </Container>
    </>
  );
}
