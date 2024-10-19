import "regenerator-runtime"; /* for async await transpile */
import "../styles/styles.css";
import "../styles/mediastyles.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app.js";

//rendering urlParser
const app = new App({
  button: document.querySelector("#hamburgerButton"),
  drawer: document.querySelector("#navigationDrawer"),
  content: document.querySelector("#mainContent"),
});

window.addEventListener("hashchange", async () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
});
