import React, { useEffect, useState } from 'react';

const FilterOptions = ({ doctorsList, setDoctors }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [modeOfConsultation, setModeOfConsultation] = useState('');
    const [constantDoctorsList, setConstantDoctorsList] = useState([]);
    const [filteredSpecialities, setFilteredSpecialities] = useState([]);

    useEffect(() => {
        if (!constantDoctorsList || constantDoctorsList.length < doctorsList.length) {
            setConstantDoctorsList(doctorsList);
        }
    }, [doctorsList]);

    useEffect(() => {
        handleFilter();
    }, [searchTerm, selectedSpecialities, modeOfConsultation]);

    useEffect(() => {
        const allSpecialities = Array.from(
            new Set(
                constantDoctorsList?.flatMap((doctor) =>
                    doctor.specialities.map((speciality) => speciality.name)
                )
            )
        );
        setFilteredSpecialities(allSpecialities);
    }, [constantDoctorsList]);

    const handleFilter = () => {
        let filteredDoctors = constantDoctorsList || [];

        if (selectedSpecialities.length > 0) {
            filteredDoctors = filteredDoctors.filter((doctor) =>
                doctor.specialities.some((speciality) =>
                    selectedSpecialities.includes(speciality.name)
                )
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
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const allSpecialities = Array.from(
            new Set(
                constantDoctorsList?.flatMap((doctor) =>
                    doctor.specialities.map((speciality) => speciality.name)
                )
            )
        );

        setFilteredSpecialities(
            allSpecialities.filter((speciality) =>
                speciality.toLowerCase().includes(term)
            )
        );
    };

    const handleSpecialityChange = (e) => {
        const { value, checked } = e.target;
        setSelectedSpecialities((prev) =>
            checked ? [...prev, value] : prev.filter((speciality) => speciality !== value)
        );
    };

    const handleModeChange = (e) => {
        setModeOfConsultation(e.target.value);
    };

    return (
        <div>
            <div>
                <label htmlFor="speciality-search">Search Specialities:</label>
                <input
                    id="speciality-search"
                    type="text"
                    placeholder="Search specialities"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {filteredSpecialities.map((speciality) => (
                    <div key={speciality}>
                        <input
                            type="checkbox"
                            id={speciality}
                            value={speciality}
                            checked={selectedSpecialities.includes(speciality)}
                            onChange={handleSpecialityChange}
                        />
                        <label htmlFor={speciality}>{speciality}</label>
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="mode">Mode of Consultation:</label>
                <select id="mode" value={modeOfConsultation} onChange={handleModeChange}>
                    <option value="">All</option>
                    <option value="video">Video Consultation</option>
                    <option value="in_clinic">In-Clinic Consultation</option>
                </select>
            </div>
        </div>
    );
};

export default FilterOptions;