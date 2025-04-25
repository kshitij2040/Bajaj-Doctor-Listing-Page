import React, { useState } from 'react';

const SortOptions = ({ doctors, setDoctors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');

    const handleSort = (criteria) => {
        let sortedDoctors = [...doctors];
        setSelectedSort(criteria);
        
        if (criteria === 'Price: Low-High') {
            sortedDoctors.sort((a, b) => {
                const priceA = parseInt(a.fees.replace('₹', '').trim());
                const priceB = parseInt(b.fees.replace('₹', '').trim());
                return priceA - priceB;
            });
        } else if (criteria === 'Experience- Most Experience first') {
            sortedDoctors.sort((a, b) => {
                const experienceA = parseInt(a.experience.split(' ')[0]);
                const experienceB = parseInt(b.experience.split(' ')[0]);
                return experienceB - experienceA;
            });
        }
        
        setDoctors(sortedDoctors);
    };

    return (
        <div className="bg-white scale-75 rounded-lg shadow">
            <div 
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-xl text-gray-600 font-medium">Sort by</h2>
                <svg 
                    className={`w-6 h-6 text-gray-600 transform ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
            </div>
            
            {isOpen && (
                <div className="px-6 pb-6 space-y-4">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="price-low-high"
                            name="sortOption"
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            checked={selectedSort === 'Price: Low-High'}
                            onChange={() => handleSort('Price: Low-High')}
                        />
                        <label htmlFor="price-low-high" className="ml-3 text-gray-700 text-lg">
                            Price: Low-High
                        </label>
                    </div>
                    
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="experience"
                            name="sortOption"
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            checked={selectedSort === 'Experience- Most Experience first'}
                            onChange={() => handleSort('Experience- Most Experience first')}
                        />
                        <label htmlFor="experience" className="ml-3 text-gray-700 text-lg">
                            Experience- Most Experience first
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortOptions;