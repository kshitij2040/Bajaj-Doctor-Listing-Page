import React, { useState } from 'react';

const FilterOptions = ({ doctorsList, setDoctors }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [modeOfConsultation, setModeOfConsultation] = useState('');

    const handleFilter = () => {
        let filteredDoctors = doctorsList;

        if (selectedSpeciality) {
            filteredDoctors = filteredDoctors.filter((doctor) =>
                doctor.specialities.some((speciality) => speciality.name === selectedSpeciality)
            );
        }

        if (modeOfConsultation) {
            if (modeOfConsultation === 'video') {
                filteredDoctors = filteredDoctors.filter((doctor) => doctor.video_consult);
            } else if (modeOfConsultation === 'in_clinic') {
                filteredDoctors = filteredDoctors.filter((doctor) => doctor.in_clinic);
            }
        }

        if (searchTerm) {
            filteredDoctors = filteredDoctors.filter((doctor) =>
                doctor.specialities.some((speciality) =>
                    speciality.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        setDoctors(filteredDoctors);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSpecialityChange = (e) => {
        setSelectedSpeciality(e.target.value);
    };

    const handleModeChange = (e) => {
        setModeOfConsultation(e.target.value);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search specialities"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div>
                <label htmlFor="speciality">Speciality:</label>
                <select id="speciality" value={selectedSpeciality} onChange={handleSpecialityChange}>
                    <option value="">All</option>
                    {Array.from(
                        new Set(
                            doctorsList.flatMap((doctor) =>
                                doctor.specialities.map((speciality) => speciality.name)
                            )
                        )
                    ).map((speciality) => (
                        <option key={speciality} value={speciality}>
                            {speciality}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="mode">Mode of Consultation:</label>
                <select id="mode" value={modeOfConsultation} onChange={handleModeChange}>
                    <option value="">All</option>
                    <option value="video">Video Consultation</option>
                    <option value="in_clinic">In-Clinic Consultation</option>
                </select>
            </div>
            <button onClick={handleFilter}>Apply Filters</button>
        </div>
    );
};

export default FilterOptions;