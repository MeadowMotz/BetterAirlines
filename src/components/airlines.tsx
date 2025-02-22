import React from "react";
import Airline from "./airline";

interface Flight {
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
}

const Airlines: React.FC<{ flights?: Flight[] }> = ({ flights }) => {
  const sampleFlights: Flight[] = [
    {
      airline: "Delta Airlines",
      departure: "10:30 AM",
      arrival: "1:45 PM",
      duration: "3h 15m",
      price: "250",
    },
    {
      airline: "United Airlines",
      departure: "2:00 PM",
      arrival: "5:20 PM",
      duration: "3h 20m",
      price: "270",
    },
    {
      airline: "American Airlines",
      departure: "4:15 PM",
      arrival: "7:40 PM",
      duration: "3h 25m",
      price: "290",
    },
  ];

  // Use `flights` if available; otherwise, use sample data.
  const flightData = flights && flights.length > 0 ? flights : sampleFlights;

  return (
    <div className="p-4 space-y-4">
      {flightData.map((flight, index) => (
        <Airline key={index} {...flight} />
      ))}
    </div>
  );
};

export default Airlines;