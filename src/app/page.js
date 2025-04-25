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
      <SortOptions doctors={doctors} setDoctors={setDoctors} />
      <FilterOptions doctorsList={doctors} setDoctors={setDoctors} />
      {doctors[0] &&
        <DoctorsList doctors={doctors} />
        }
    </>
  );
}
