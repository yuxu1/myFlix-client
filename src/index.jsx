import { createRoot} from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

//import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//main component
const App = () => {
    return <MainView />;
};

//finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells React to render your app in the root DOM element
root.render(<App/>);