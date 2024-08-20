import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AllProperties.css';
import {jwtDecode} from "jwt-decode";

const LandlordProperties = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoading(true);
            try {

                const token = document.cookie.split('=')[1];
                console.log('Token:', token);
                const decodedToken = jwtDecode(token);
                const email = decodedToken.principal;

                console.log('Token:', token);
                console.log(email);


                // Fetch properties using the email from the decoded token
                const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/property/findByLandlord', {
                    email: email
                });

                setProperties(response.data.properties); // Adjust according to your API response structure
            } catch (error) {
                console.error('Error fetching properties:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);


    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>All Properties</h1>
            </div>
            <div className="property-grid">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <PropertyCard key={property.id} property={property}/>
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
        </div>
    );
};

export default LandlordProperties;
