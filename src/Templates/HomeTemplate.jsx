import React from "react";
import { Outlet } from "react-router-dom";
import FooterHome from "../Components/FooterHome/FooterHome";
import HeaderHome from "../Components/HeaderHome/HeaderHome";
export const HomeTemplate = () => {
  return (
    <>
    <HeaderHome/>
      <div style={{ minHeight: "75vh" }}>
        <Outlet />
      </div>
    <FooterHome/>
    </>
  );
};
