import { createRoot} from 'react-dom/client';

//import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//main component(will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <div className = "my-flix">
            <div>Good morning</div>
        </div>
    );
};

//finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells React to render your app in the root DOM element
root.render(<MyFlixApplication/>);