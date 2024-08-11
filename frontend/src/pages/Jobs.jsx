import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";
import Navbar from "@/components/shared/Navbar";
import { useFetchAllJobsQuery } from "@/redux/api";
import React from "react";
import { useSelector } from "react-redux";

function Jobs() {
  // const { allJobs } = useSelector((store) => store.job);

  const { isError, error, data, isLoading, isSuccess } = useFetchAllJobsQuery();

  if (isLoading) {
    return <div>Loading.......</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="min-w-[15%]">
            <FilterCard />
          </div>
          {!isLoading && data?.jobs?.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {!isLoading && data?.jobs?.length <= 0 ? (
                  <span>No jobs found</span>
                ) : (
                  data?.jobs?.map((item, index) => (
                    <div>
                      <Job key={index} job={item} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
