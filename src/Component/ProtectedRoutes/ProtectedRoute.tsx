import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute=(props: any)=> {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
  });
  return (
    <>
      <Component />
    </>
  );
};

export const AdminRoute=(props: any)=> {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let auth = localStorage.getItem("admin");
    if (!auth) {
      navigate("/");
    }
  });
  return (
    <>
      <Component />
    </>
  );
};

