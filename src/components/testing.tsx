import { useEffect, useState } from "react";
import { airlineAPI } from "../utils/airlines"; // Adjust the path accordingly

const Testing = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await airlineAPI();
        setFlights(data);
      } catch (err) {
        setError("Error");
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h2>Live Flight Data</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            {`${flight.airline.name} flight ${flight.flight.iata} `}
            {`from ${flight.departure.airport} (${flight.departure.iata}) `}
            {`to ${flight.arrival.airport} (${flight.arrival.iata}) is in the air.`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Testing;
