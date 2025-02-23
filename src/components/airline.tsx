import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './FlightTable.css'; // Import the CSS file

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
    <div className="flight-table-container">
      <table className="flight-table">
        <thead>
          <tr>
            <th>Airline</th>
            <th>Departure Airport</th>
            <th>Departure Date/Time</th>
            <th>Arrival Airport</th>
            <th>Arrival Date/Time</th>
            <th>Flight Duration</th>
            <th className="price">Price</th>
            <th>Baggage Policies</th>
            <th>Layover Times</th>
            <th>Amenities</th>
            <th>Trip Type</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight: Flight, index: number) => (
            <tr key={index}>
              <td>{flight.airline}</td>
              <td>{flight.airports.departure}</td>
              <td>{`${flight.departureDate} ${flight.departureTime}`}</td>
              <td>{flight.airports.arrival}</td>
              <td>{`${flight.arrivalDate} ${flight.arrivalTime}`}</td>
              <td>{flight.duration}</td>
              <td className="price">${flight.price}</td>
              <td>{flight.baggagePolicies}</td>
              <td>{flight.layoverTimes}</td>
              <td>{flight.amenities.join(", ")}</td>
              <td>{flight.option}</td>
              <td className="icon-container">
                <img src="/src/assets/Free-Transparent-Black-Star-Vector-1.png" style={{ width: "25px", height: "25px" }}/>
                <img src="/src/assets/ringing-bell-icon-with-reflection-on-white-background.png" style={{ width: "25px", height: "25px" }}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;