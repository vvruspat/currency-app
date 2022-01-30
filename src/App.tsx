import { useErrorBoundary } from "use-error-boundary";
import { Header, Panel } from "./components/uikit";
import { Exchange } from "./components/Exchange/Exchange";

import "./App.css";

const App = () => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return (
    <div className="App">
      <Header>Currency App</Header>
      <Panel>
        {didCatch ? (
          <p>An error has been caught: {error.message}</p>
        ) : (
          <ErrorBoundary>
            <Exchange />
          </ErrorBoundary>
        )}
      </Panel>
    </div>
  );
};

export default App;
