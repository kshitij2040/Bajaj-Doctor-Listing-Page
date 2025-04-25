import React, { useEffect, useState } from 'react';

const FilterOptions = ({ doctorsList, setDoctors }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [modeOfConsultation, setModeOfConsultation] = useState('');
    const [constantDoctorsList, setConstantDoctorsList] = useState([]);
    const [filteredSpecialities, setFilteredSpecialities] = useState([]);
    const [specialitiesOpen, setSpecialitiesOpen] = useState(true);
    const [modeOpen, setModeOpen] = useState(true);

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

    const handleModeChange = (value) => {
        setModeOfConsultation(value);
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedSpecialities([]);
        setModeOfConsultation('');
    };

    return (
        <div className="bg-white scale-75 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
                <button 
                    onClick={clearAllFilters}
                    className="text-black font-medium"
                >
                    Clear All
                </button>
            </div>
            
            {/* Specialities Section */}
            <div className="mb-6">
                <div 
                    className="flex justify-between items-center mb-4 cursor-pointer"
                    onClick={() => setSpecialitiesOpen(!specialitiesOpen)}
                >
                    <h3 className="text-xl text-gray-600">Specialities</h3>
                    <svg 
                        className={`w-6 h-6 text-gray-600 transform ${specialitiesOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                
                {specialitiesOpen && (
                    <>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search specialities"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div className="max-h-64 overflow-y-auto">
                            {filteredSpecialities.map((speciality) => (
                                <div key={speciality} className="flex items-center mb-3">
                                    <input
                                        type="checkbox"
                                        id={speciality}
                                        value={speciality}
                                        checked={selectedSpecialities.includes(speciality)}
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={speciality} className="ml-2 text-gray-700">
                                        {speciality}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            {/* Mode of Consultation Section */}
            <div>
                <div 
                    className="flex justify-between items-center mb-4 cursor-pointer"
                    onClick={() => setModeOpen(!modeOpen)}
                >
                    <h3 className="text-xl text-gray-600">Mode of consultation</h3>
                    <svg 
                        className={`w-6 h-6 text-gray-600 transform ${modeOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                
                {modeOpen && (
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="video"
                                name="consultMode"
                                checked={modeOfConsultation === 'video'}
                                onChange={() => handleModeChange('video')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="video" className="ml-2 text-gray-700">
                                Video Consultation
                            </label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="in_clinic"
                                name="consultMode"
                                checked={modeOfConsultation === 'in_clinic'}
                                onChange={() => handleModeChange('in_clinic')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="in_clinic" className="ml-2 text-gray-700">
                                In-clinic Consultation
                            </label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="all"
                                name="consultMode"
                                checked={modeOfConsultation === ''}
                                onChange={() => handleModeChange('')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="all" className="ml-2 text-gray-700">
                                All
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterOptions;