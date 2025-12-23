import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import AccountsPage from "./pages/AccountsPage";
import CardsPage from "./pages/CardsPage";
import TransfersPage from "./pages/TransfersPage";
import BillsPage from "./pages/BillsPage";
import MorePage from "./pages/MorePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/transfers" element={<TransfersPage />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/more" element={<MorePage />} />
            <Route path="/savings" element={<MorePage />} />
            <Route path="/investments" element={<MorePage />} />
            <Route path="/security" element={<MorePage />} />
            <Route path="/settings" element={<MorePage />} />
            <Route path="/help" element={<MorePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
