import React from "react";

interface FlightProps {
  airline: string;
  departure: string;
  arrival: string;
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

const FlightTable: React.FC<{ flights: FlightProps[] }> = ({ flights }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left">Airline</th>
          <th className="px-4 py-2 text-left">Departure Airport</th>
          <th className="px-4 py-2 text-left">Departure Time</th>
          <th className="px-4 py-2 text-left">Arrival Airport</th>
          <th className="px-4 py-2 text-left">Arrival Time</th>
          <th className="px-4 py-2 text-left">Flight Duration</th>
          <th className="px-4 py-2 text-left">Price</th>
          <th className="px-4 py-2 text-left">Baggage Policies</th>
          <th className="px-4 py-2 text-left">Layover Times</th>
          <th className="px-4 py-2 text-left">Amenities</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight, index) => (
          <tr key={index} className="border-b hover:bg-gray-100">
            <td className="px-4 py-2">{flight.airline}</td>
            <td className="px-4 py-2">{flight.airports.departure}</td>
            <td className="px-4 py-2">{flight.departure}</td>
            <td className="px-4 py-2">{flight.airports.arrival}</td>
            <td className="px-4 py-2">{flight.arrival}</td>
            <td className="px-4 py-2">{flight.duration}</td>
            <td className="px-4 py-2">${flight.price}</td>
            <td className="px-4 py-2">{flight.baggagePolicies}</td>
            <td className="px-4 py-2">{flight.layoverTimes}</td>
            <td className="px-4 py-2">{flight.amenities.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FlightData: FlightProps[] = [
  {
    airline: "Airline A",
    departure: "10:00 AM",
    arrival: "12:30 PM",
    duration: "2h 30m",
    price: "150",
    baggagePolicies: "1 checked bag, 1 carry-on",
    layoverTimes: "No layover",
    airports: {
      departure: "JFK",
      arrival: "LAX",
    },
    amenities: ["Wi-Fi", "In-flight meals", "Entertainment"],
  },
  {
    airline: "Airline B",
    departure: "2:00 PM",
    arrival: "4:30 PM",
    duration: "2h 30m",
    price: "120",
    baggagePolicies: "2 checked bags, 1 carry-on",
    layoverTimes: "1h 30m in ATL",
    airports: {
      departure: "LAX",
      arrival: "JFK",
    },
    amenities: ["Wi-Fi", "Extra legroom"],
  },
  // Add more flight data here...
];

const App: React.FC = () => {
  return (
    <div className="p-6">
      <FlightTable flights={FlightData} />
    </div>
  );
};

export default App;