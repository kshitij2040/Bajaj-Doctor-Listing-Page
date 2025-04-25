"use client"

import DoctorCard from "@/components/DoctorCard";
import DoctorsList from "@/components/DoctorsList";
import FetchDoctors from "@/components/FetchDoctors";
import FilterOptions from "@/components/FilterOptions";
import Navbar from "@/components/Navbar";
import SortOptions from "@/components/SortOptions";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  return (
    <>
      <FetchDoctors setDoctors={setDoctors} />
      <Navbar doctors={doctors} />

      <div className="flex flex-row items-start justify-center gap-4 p-4">
        <div className=" sticky top-0 left-0 w-1/4 h-screen bg-white border-r border-gray-200">
          <SortOptions doctors={doctors} setDoctors={setDoctors} />
          <FilterOptions doctorsList={doctors} setDoctors={setDoctors} />
        </div>

        <DoctorsList doctors={doctors} />

      </div>
    </>
  );
}
