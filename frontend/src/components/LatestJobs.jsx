import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useFetchAllJobsQuery } from "@/redux/api";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  // const { isError, error, data, isLoading, isSuccess } = useFetchAllJobsQuery();

  // if (isLoading) {
  //   return <div>Loading.......</div>;
  // }

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs?.jobs?.length <= 0 ? (
          <span>No Jobs Availale</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((item, index) => <LatestJobCards key={index} job={item} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
