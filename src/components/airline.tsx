import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  airports: {
    departure: string;
    arrival: string;
  };
  amenities: string[];
}

const FlightTable: React.FC = () => {
  const location = useLocation();
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const incomingFlights = location.state?.flights || [];

    const flatFlights = incomingFlights.flat();

    const uniqueFlights = [
      ...new Map(
        flatFlights.map((flight) => [
          flight.airline + flight.departureTime,
          flight,
        ])
      ).values(),
    ];

    setFlights(uniqueFlights); // Update the state with unique flights
  }, [location.state?.flights]);

  if (!flights.length) {
    return <div className="p-6">No flights available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Airline</th>
            <th className="px-4 py-2 text-left">Departure Airport</th>
            <th className="px-4 py-2 text-left">Departure Date/Time</th>
            <th className="px-4 py-2 text-left">Arrival Airport</th>
            <th className="px-4 py-2 text-left">Arrival Date/Time</th>
            <th className="px-4 py-2 text-left">Flight Duration</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Baggage Policies</th>
            <th className="px-4 py-2 text-left">Layover Times</th>
            <th className="px-4 py-2 text-left">Amenities</th>
            <th className="px-4 py-2 text-left">Trip Type</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight: Flight, index: number) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{flight.airline}</td>
              <td className="px-4 py-2">{flight.airports.departure}</td>
              <td className="px-4 py-2">{`${flight.departureDate} ${flight.departureTime}`}</td>
              <td className="px-4 py-2">{flight.airports.arrival}</td>
              <td className="px-4 py-2">{`${flight.arrivalDate} ${flight.arrivalTime}`}</td>
              <td className="px-4 py-2">{flight.duration}</td>
              <td className="px-4 py-2">${flight.price}</td>
              <td className="px-4 py-2">{flight.baggagePolicies}</td>
              <td className="px-4 py-2">{flight.layoverTimes}</td>
              <td className="px-4 py-2">{flight.amenities.join(", ")}</td>
              <td className="px-4 py-2">{flight.option}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
