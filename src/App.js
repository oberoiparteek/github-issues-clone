import logo from "./logo.svg";
import "./App.css";
import Issues from "./components/Issues";

function App() {
  return (
    <>
      <header className="container mt-5">
        <span>
          <span className="h4">
            facebook / <b>react</b>
          </span>
          <span className="badge badge-primary text-secondary border m-2">
            Public
          </span>
        </span>
      </header>
      <Issues/>
    </>
  );
}

export default App;
