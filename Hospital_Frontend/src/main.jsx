
import ReactDOM from "react-dom/client"; // Updated import
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"

// Updated code
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
