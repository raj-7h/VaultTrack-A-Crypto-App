import React from "react";
import ReactDOM from "react-dom/client";

/*NOTE - 	
1.ReactDOM: This is a part of React that is responsible for showing (rendering) your React app inside a web page (in the browser).

	2.“react-dom/client”: This is where React keeps the special tools that work with the new React 18 features, 
  like improving how React updates the page.

  In simple terms: import ReactDOM from "react-dom/client"; 
  is just a new way in React 18 to help React show your app on the webpage, using a newer, more powerful tool (called createRoot).
  */

import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";
/*NOTE - 
	ChakraProvider: This component is a context provider that wraps your entire application,
   allowing you to use Chakra UI components and style them consistently. 
   It ensures that all Chakra UI features, such as styling and theming, are available throughout the app.

   	theme: This is the default theme provided by Chakra UI. It contains pre-defined styles, colors, fonts, 
    and other design tokens that can be used across your app to maintain consistency in UI elements. 
    You can customize the theme to fit your design requirements by extending or overriding the default values.

  */

const root = ReactDOM.createRoot(document.getElementById("root"));

/*NOTE - 
	1.	ReactDOM.createRoot: Think of this as telling React, “I want to start showing my app in this part of the webpage.”

	2.	document.getElementById('root'): This finds the spot in the webpage where the app will be shown. 
  It looks for a div with the ID of root (usually found in index.html).

	3.	root.render(): Finally, this takes your React app (<App />) and shows it in the browser.
  */
root.render(
  //
  <React.StrictMode>
    {/*NOTE - React.StrictMode just check for the potential issue by running
    apps two times and it should remove while Deploying */}
    <ChakraProvider theme={theme}>
      {/*NOTE - ChakraProvider is a special component provided by Chakra UI that wraps your entire application (or a part of it). 
      It enables all the features of Chakra UI, like its styling and theme management.*/}

      <App />
    </ChakraProvider>
  </React.StrictMode>
);

export const server = "https://api.coingecko.com/api/v3";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
