import "./App.css";
import "./index.css";

import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import store from "./ducks/store";
import About from "./components/About";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Form from "./components/Form";

import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/position/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Form />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>

    // <Provider store={store}>
    //
    // </Provider>
  );
}

export default App;
