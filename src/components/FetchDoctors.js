"use client"

import React, { useEffect, useState } from 'react';

export default function FetchDoctors ({ setDoctors }) {
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, [setDoctors]);

    return null; 
};
