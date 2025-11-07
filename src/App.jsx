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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <MyNavBar></MyNavBar>
        <Routes>
          <Route path="db" element={<Database />} />
          <Route path="spl" element={<Suppliers />} />
          <Route path="spl-add" element={<AddSupplier />} />
          <Route path="wh" element={<Warehouse />} />
          <Route path="wh-in-arj" element={<WhIn />} />
          <Route path="wh-distr" element={<WhDistribution />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
