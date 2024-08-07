import Job from "@/components/Job";
import Navbar from "@/components/shared/Navbar";
import React from "react";

function Browse() {
  const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-medium">Search Results 0 </h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJobs.map((job) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse;
