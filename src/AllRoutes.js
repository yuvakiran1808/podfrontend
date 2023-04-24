import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/AdminRoutes";
import Admindashboard from "./user/Admindashboard";
import Podcasts from "./user/Podcasts";
import PrivateRoute from "./auth/PrivateRoutes";
import Player from "./user/Player";
const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/player" element={<Player />} />
        <Route
          path="/podcasts"
          element={
            <PrivateRoute>
              <Podcasts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Admindashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
