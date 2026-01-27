"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const Dashboard = () => {
  const data = useQuery(api.users.getCurrentUser);
  console.log(data);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
