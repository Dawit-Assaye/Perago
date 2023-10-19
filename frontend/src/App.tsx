import "./App.css";
import "./index.css";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from "@mantine/core";
// import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import store from "./ducks/store";
import About from "./components/About";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Form from "./components/Form";
import UpdateRootForm from "./components/UpdateRootForm";
import UpdateChildForm from "./components/UpdateChildForm";
import SubsidiaryForm from "./components/SubsidiaryForm";
// import {NavBar} from "./components/NavBar"
const myColor: MantineColorsTuple = [
  "#effee7",
  "#e0f8d4",
  "#c2efab",
  "#a2e67e",
  "#87de57",
  "#75d940",
  "#6bd731",
  "#59be23",
  "#4da91b",
  "#3d920c",
];

const myColor2: MantineColorsTuple = [
  "#f6ecff",
  "#e7d6fb",
  "#caabf1",
  "#ac7ce8",
  "#9354e0",
  "#833cdb",
  "#7b2eda",
  "#6921c2",
  "#5d1cae",
  "#501599",
];

const theme = createTheme({
  fontFamily: "sans-serif",
  colors: {
    myColor,
    myColor2,
  },
});

function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/position/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Form />} />
          <Route path="/position/updateroot/:id" element={<UpdateRootForm />} />
          <Route
            path="/position/updatechild/:id/:ip"
            element={<UpdateChildForm />}
          />
          <Route path="/position/subsidiary/:id" element={<SubsidiaryForm/>} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>

    // <Provider store={store}>
    //
    // </Provider>
  );
}

export default App;
