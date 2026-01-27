"use client";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";

const Dashboard = () => {
  const {data,error,isLoading} = useConvexQuery(api.project.getUserProjects);
  console.log(data);

  return (
    <div className="h-screen w-full flex items-center justify-center">
     
    </div>
  );
};

export default Dashboard;
