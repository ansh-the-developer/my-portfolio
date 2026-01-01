import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"; // 👈 add defaultSystem
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      {/* 👆 pass value to fix _config error */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
