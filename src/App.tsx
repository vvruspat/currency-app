import { ChangeEvent, useState } from "react";
import { Header, Panel, Button, Input } from "./components/uikit";
import "./App.css";
import { Modal } from "./components/uikit/Modal";

function App() {
  const [val, setVal] = useState("test");
  const [modal, setModal] = useState(false); // TODO: модалки сдлать через контекст по ID, тут их как минимум 2 уже

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
            setModal(!modal);
          }}
        >
          Test button
        </Button>
        <Button disabled>Test button</Button>
        <Button stretched mode="secondary">
          Stretched button
        </Button>
        <Modal
          header="Test modal"
          show={modal}
          onClose={() => setModal(!modal)}
        >
          <Button stretched>Test stretched </Button>
          <Button stretched>Test stretched </Button>
          <Button stretched>Test stretched </Button>
        </Modal>
      </Panel>
    </div>
  );
}

export default App;
