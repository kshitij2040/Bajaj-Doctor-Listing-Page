'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

export default function Navbar({ doctors }) {
  const [query, setQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();

    return doctors
      .filter((doctor) => {
        return (
          doctor.name.toLowerCase().includes(lowerQuery) ||
          doctor.specialities.some((s) =>
            s.name.toLowerCase().includes(lowerQuery)
          ) ||
          doctor.clinic.name.toLowerCase().includes(lowerQuery)
        );
      })
      .slice(0, 3); // return top 3 matches
  }, [query, doctors]);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between relative">
      <div className="text-xl font-bold">DoctorFinder</div>
      <div className="relative w-full md:w-96">
        <input
          type="text"
          placeholder="Search doctors, specialities, or clinics..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && filteredDoctors.length > 0 && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex gap-3 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{doctor.name}</span>
                  <span className="text-gray-500 text-xs">
                    {doctor.specialities.map((s) => s.name).join(', ')} -{' '}
                    {doctor.clinic.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
