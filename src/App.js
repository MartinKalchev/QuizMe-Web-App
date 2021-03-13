import { ConfirmProvider } from "material-ui-confirm";
import Categories from "./components/Categories";

const App = () => {
  return (
    <ConfirmProvider>
        <div><Categories /></div>
    </ConfirmProvider>
  );
}

export default App;
