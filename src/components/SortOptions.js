import React from 'react';

const SortOptions = ({ doctors, setDoctors }) => {
    const handleSort = (criteria) => {
        let sortedDoctors = [...doctors];
        if (criteria === 'Price: Low-High') {
            sortedDoctors.sort((a, b) => {
                const priceA = parseInt(a.fees.replace('₹', '').trim());
                const priceB = parseInt(b.fees.replace('₹', '').trim());
                return priceA - priceB;
            });
        } else if (criteria === 'Experience: Most experienced first') {
            sortedDoctors.sort((a, b) => {
                const experienceA = parseInt(a.experience.split(' ')[0]);
                const experienceB = parseInt(b.experience.split(' ')[0]);
                return experienceB - experienceA;
            });
        }
        setDoctors(sortedDoctors);
    };

    return (
        <div>
            <label htmlFor="sort-options">Sort By: </label>
            <select
                id="sort-options"
                onChange={(e) => handleSort(e.target.value)}
                defaultValue=""
            >
                <option value="" disabled>
                    Select an option
                </option>
                <option value="Price: Low-High">Price: Low-High</option>
                <option value="Experience: Most experienced first">
                    Experience: Most experienced first
                </option>
            </select>
        </div>
    );
};

export default SortOptions;