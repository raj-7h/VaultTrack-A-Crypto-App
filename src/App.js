import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/*NOTE - This is a component that enables routing in your app. It keeps
      track of the current URL and renders the appropriate components based on
      the route. This is like a map for your app. It helps React know which part
      of the app to show based on the URL */}

      <Header />
      {/*NOTE - This is a custom component that represents the header of your app. It usually contains navigation links or branding.
      This is a section at the top of your app, like a title or menu, that stays the same on every page.*/}

      <Routes>
        {/*NOTE - This is a container for defining multiple routes in your app.
        Each route specifies a path and the component that should be rendered
        when that path is visited. his section is where you define different
        pages or views in your app. Each page corresponds to a URL */}

        <Route path="/" element={<Home />} />
        {/*NOTE - Each <Route> component defines a specific path and the corresponding component that should be displayed when that path is matched.*/}

        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
