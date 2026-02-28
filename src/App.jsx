import { useState } from "react";
import MyNavBar from "./components/MyNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Database from "./pages/Database/DB/Database";
import Suppliers from "./pages/Database/Suppliers/Suppliers"
// import AddItem from "./pages/Database/DB/AddItem"
import AddSupplier from "./pages/Database/Suppliers/AddSupplier"
import Warehouse from "./pages/Warehouse/Warehouse"
import WhIn from "./pages/Warehouse/WhIn"
import WhDistribution from "./pages/Warehouse/WhDistribution"
import WhSetDistribution from "./pages/Warehouse/WhSetDistribution"
import WhSetDistrHistory from "./pages/Warehouse/WhSetDistrHistory"
import Leftovers1 from "./pages/Checkout/Leftovers1";
import Leftovers2 from "./pages/Checkout/Leftovers2";
import Summary from "./pages/Checkout/Summary";
import WhRecalculation from "./pages/Warehouse/WhRecalculation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        {/* <MyNavBar ></MyNavBar> */}
        <div className="app-container">
          <MyNavBar />
          <div className="content-with-padding" style={{ paddingTop: '40px' }}>
            {/* Routes или другой контент */}
          </div>
        </div>
        <Routes>
          <Route path="db" element={<Database />} />
          <Route path="spl" element={<Suppliers />} />
          <Route path="spl-add" element={<AddSupplier />} />
          <Route path="wh" element={<Warehouse />} />
          <Route path="wh-in-arj" element={<WhIn />} />
          <Route path="wh-distr" element={<WhDistribution />} />
          <Route path="wh-set-distr" element={<WhSetDistribution />} />
          <Route path="wh-set-distr-hist" element={<WhSetDistrHistory />} />
          <Route path="check-leftovers1" element={<Leftovers1 />} />
          <Route path="check-leftovers2" element={<Leftovers2 />} />
          <Route path="check" element={<Summary />} />
          <Route path="recalc" element={<WhRecalculation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
