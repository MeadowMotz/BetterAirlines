import React from "react";

interface FlightProps {
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
}

const Airline: React.FC<FlightProps> = ({ airline, departure, arrival, duration, price }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
      {/* Airline Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          ✈️
        </div>
        <p className="font-semibold text-lg">{airline}</p>
      </div>

      {/* Flight Details */}
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600">Departure</p>
        <p className="text-lg font-semibold">{departure}</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600">Arrival</p>
        <p className="text-lg font-semibold">{arrival}</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600">Duration</p>
        <p className="text-lg font-semibold">{duration}</p>
      </div>

      {/* Price */}
      <div className="text-xl font-bold text-green-600">${price}</div>

      {/* Select Button */}
      <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
        Select
      </button>
    </div>
  );
};

export default Airline;