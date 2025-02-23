import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FlightTable.css"; // Import the CSS file

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
  const [favorites, setFavorites] = useState<boolean[]>([]);
  const [bellNotifications, setBellNotifications] = useState<boolean[]>([]);

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

    setFlights(uniqueFlights);
    setFavorites(new Array(uniqueFlights.length).fill(false));
    setBellNotifications(new Array(uniqueFlights.length).fill(false));
  }, [location.state?.flights]);

  const toggleFavorite = (index: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  const toggleBell = (index: number) => {
    setBellNotifications((prevBell) => {
      const newBell = [...prevBell];
      newBell[index] = !newBell[index];
      return newBell;
    });
  };

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
            <th />
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
                {/* Star Toggle */}
                <img
                  src={
                    favorites[index]
                      ? "/src/assets/goldstar.png"
                      : "/src/assets/Free-Transparent-Black-Star-Vector-1.png"
                  }
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  onClick={() => toggleFavorite(index)}
                  alt="Favorite Star"
                />
                {/* Bell Toggle */}
                <img
                  src={
                    bellNotifications[index]
                      ? "/src/assets/ringingbell.png"
                      : "/src/assets/ringing-bell-icon-with-reflection-on-white-background.png"
                  }
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  onClick={() => toggleBell(index)}
                  alt="Notification Bell"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
