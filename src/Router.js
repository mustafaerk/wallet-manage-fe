import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Outgoing = React.lazy(() => import("pages/Views/Outgoing"));
const DashBoard = React.lazy(() => import("pages/Views/DashBoard"));
const Category = React.lazy(() => import("pages/Views/Category"));
const Incomes = React.lazy(() => import("pages/Views/Incomes"));
const NewTransaction = React.lazy(() => import("pages/Views/NewTransaction"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <DashBoard />
            </React.Suspense>
          }
        />
        <Route
          path="/outgoing"
          element={
            <React.Suspense fallback={<>...</>}>
              <Outgoing />
            </React.Suspense>
          }
        />
        <Route
          path="/category"
          element={
            <React.Suspense fallback={<>...</>}>
              <Category />
            </React.Suspense>
          }
        />
        <Route
          path="/incomes"
          element={
            <React.Suspense fallback={<>...</>}>
              <Incomes />
            </React.Suspense>
          }
        />
        <Route
          path="/newTransaction"
          element={
            <React.Suspense fallback={<>...</>}>
              <NewTransaction />
            </React.Suspense>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
