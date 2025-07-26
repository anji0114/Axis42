"use client";

import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3300/api/users/me", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

  return <div>Dashboard</div>;
}
