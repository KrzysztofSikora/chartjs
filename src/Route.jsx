import React, { useState, useEffect } from 'react';
import {DirectionsRenderer, GoogleMap, LoadScript} from '@react-google-maps/api';
import ApiService from "./service/api";

const Route = ({apiKey}) => {
    const [waypoints, setWaypoints] = useState([]);
    const [directions, setDirections] = useState([]);
    const [isLoaded, setLoaded] = useState(false)

    const handleLoadScript = () => {
        setLoaded(true);
    };

    useEffect(() => {
        async function fetchLocations() {
            const dataChart = await ApiService.getDataChart();
            setWaypoints(dataChart)
        }
        fetchLocations()
    }, []);
    useEffect(() => {
    if (waypoints.length > 0) {
        const getDirections = async () => {
            const maxWaypoints = 20;
            const numSegments = Math.ceil(waypoints.length / maxWaypoints);

            for (let i = 0; i < numSegments; i++) {
                const startIdx = i * maxWaypoints;
                const endIdx = Math.min((i + 1) * maxWaypoints, waypoints.length);
                const segmentWaypoints = waypoints.slice(startIdx, endIdx);
                if (i > 0) {
                    segmentWaypoints.unshift(waypoints[startIdx - 1]);
                }
                const directionsRequest = {
                    destination: segmentWaypoints[segmentWaypoints.length - 1],
                    origin: segmentWaypoints[0],
                    waypoints: segmentWaypoints.slice(1, -1).map(point => ({ location: point })),
                    travelMode: 'DRIVING',
                };

                const response = await getDirectionsServiceResponse(directionsRequest);
                setDirections(prevDirections => [...prevDirections, response]);

            }
        };

        const getDirectionsServiceResponse = async (request) => {
            return new Promise(resolve => {
                const loadSerivce = async () => {
                    const directionsService = new window.google.maps.DirectionsService();
                    await directionsService.route(request, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            resolve(result);
                        } else {
                            console.error(`Error: ${status}`);
                            resolve(null);
                        }
                    });
                }
                loadSerivce()

            });
        };

        getDirections();

     }
    }, [waypoints, isLoaded]);

    const mapContainerStyle = {
        width: '1000px',
        height: '400px',
    };
    const center = waypoints.length > 0 ? waypoints[0] : { lat: 0, lng: 0 };

    return (
        <LoadScript onLoad={handleLoadScript} googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            >
               {directions.map((direction, index) => (
                    <DirectionsRenderer key={index} directions={direction}  options={{ suppressMarkers: true }}/>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default Route;