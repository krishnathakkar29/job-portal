import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useFetchAllJobsQuery } from "@/redux/api";
import { setAllJobs } from "@/redux/jobSlice";
import React from "react";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  // const { isError, error, data, isLoading, isSuccess } = useFetchAllJobsQuery();

  // if (isSuccess && !isLoading) {
  //   dispatch(setAllJobs(data.jobs));
  // }
  // console.log(isError);

  // if (isLoading) {
  //   return <div>Loading.......</div>;
  // }

  useGetAllJobs();
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
}

export default Home;
