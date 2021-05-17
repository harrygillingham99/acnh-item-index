import "./App.scss";
import useSetState from "react-use/lib/useSetState";
import { Container, Tabs, Tab } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { VillagerTab } from "./Components/VillagerTab";
import { ItemTab } from "./Components/ItemTab";
import { FishCard } from "./Components/Cards/FishCard";
import { SeaCreatureCard } from "./Components/Cards/SeaCreatureCard";
import { BugCard } from "./Components/Cards/BugCard";
import { HousewareTab } from "./Components/HousewareTab";
import { ApiUrl } from "./types/Urls";

interface AppState {
  activeTab: TabNames;
}

enum TabNames {
  Villagers = "Villagers",
  Fish = "Fish",
  Bugs = "Bugs",
  SeaCreatures = "Sea Creatures",
  Houseware = "Houseware",
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
        </Tabs>
      </Container>
    </>
  );
}
