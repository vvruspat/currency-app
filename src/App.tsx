import { ChangeEvent, useContext, useState } from "react";
import { Header, Panel, Button, Input } from "./components/uikit";
import "./App.css";
import { Modal } from "./components/uikit/Modal";
import { MODALS, ModalsContext } from "./components/Modals/Modals";
import { Select, SelectorOption } from "./components/uikit/Select";
import { CurrencyInput } from "./components/CurrencyInput/CurrencyInput";

function App() {
  const [val, setVal] = useState("test");
  const { setModal } = useContext(ModalsContext);

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

  const [selectValue, setSelectValue] = useState(options[0]);

  return (
    <div className="App">
      <Header>Currency App</Header>
      <Panel>
        <Input
          value={val}
          align="right"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setVal(e.target.value)
          }
        />
        <Button
          onClick={() => {
            setModal(MODALS.ERROR_MODAL);
          }}
        >
          Test button
        </Button>
        <Button disabled>Test button</Button>
        <Button stretched mode="secondary">
          Stretched button
        </Button>
        <Modal header="Test modal" nav={MODALS.ERROR_MODAL}>
          <Button stretched>Test stretched </Button>
          <Button stretched>Test stretched </Button>
          <Button stretched>Test stretched </Button>
        </Modal>
        <CurrencyInput />
      </Panel>
    </div>
  );
}

export default App;
