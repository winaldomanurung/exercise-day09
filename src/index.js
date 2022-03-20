import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

// import main app
import Main from "./main";

// render main component
ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
