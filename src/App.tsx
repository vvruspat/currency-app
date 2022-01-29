import { Header, Panel } from "./components/uikit";
import { SelectorOption } from "./components/uikit/Select";
import "./App.css";
import { Exchange } from "./components/Exchange/Exchange";

// TODO: create error boundary

function App() {
  const options: SelectorOption[] = [
    {
      key: "RUB",
      value: {
        icon: "₽",
        description: "Russian rubble",
        content: "RUB",
      },
    },
    {
      key: "EUR",
      value: {
        icon: "Е",
        description: "Euro",
        content: "EUR",
      },
    },
    {
      key: "USD",
      value: {
        icon: "$",
        description: "US Dollar",
        content: "USD",
      },
    },
    {
      key: "GBR",
      value: {
        icon: "G",
        description: "UK",
        content: "RUB",
      },
    },
    {
      key: "UAH",
      value: {
        icon: "U",
        description: "Ukranian grivna",
        content: "UAH",
      },
    },
  ];

  return (
    <div className="App">
      <Header>Currency App</Header>
      <Panel>
        <Exchange />
      </Panel>
    </div>
  );
}

export default App;
