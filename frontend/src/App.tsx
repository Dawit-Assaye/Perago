import { MantineProvider } from "@mantine/core";
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { useForm } from "@mantine/form";
import "./App.css";
import "./index.css";
import store from "./ducks/store";
import About from "./components/About";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider>
          <Routes>
            <Route
              path="/About"
              element={<About/>}
            />
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
