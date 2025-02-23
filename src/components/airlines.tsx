import React, { useState, useEffect } from "react";
import Airline from "./airline";
import { useLocation } from "react-router-dom"; // If using React Router
import InputBar from "./inputBar";

interface Flight {
  airline: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  duration: string;
  price: string;
  baggagePolicies: string;
  layoverTimes: string;
  option: string;
  airports: {
    departure: string;
    arrival: string;
  };
  amenities: string[];
}

const Airlines: React.FC = () => {
  const location = useLocation();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure we have a flat array of flights and remove duplicates
    const incomingFlights = location.state?.flights || [];
    const flatFlights = incomingFlights.flat(); // In case it's an array of arrays
    const uniqueFlights = [
      ...new Map(
        flatFlights.map((flight) => [
          flight.airline + flight.departureTime,
          flight,
        ])
      ).values(),
    ];
    setFlights(uniqueFlights);
  }, [location.state?.flights]);

  // If there is an error, show it
  if (error) return <div>Error: {error}</div>;

  if (!flights.length) return <div>No flights available</div>;

  return (
    <div className="p-4 space-y-4">
      <InputBar />
      <Airline></Airline>
    </div>
  );
};

export default Airlines;
