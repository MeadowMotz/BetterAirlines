import { useEffect, useState } from "react";
import { generateAirlines } from "../utils/airlines";

const Testing = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await generateAirlines();
        console.log("Testing response:", response);

        // Ensure response is properly formatted
        const flightData = Array.isArray(response)
          ? response
          : JSON.parse(response);

        setFlights(flightData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Error fetching flights");
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Flight Options</h2>
      {flights.map((flight, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>
            Flight {index + 1}: {flight.airline}
          </h3>
          <p>
            <strong>Departure:</strong> {flight.departureDate} at{" "}
            {flight.departureTime} ({flight.airports.departure})
          </p>
          <p>
            <strong>Arrival:</strong> {flight.arrivalDate} at{" "}
            {flight.arrivalTime} ({flight.airports.arrival})
          </p>
          <p>
            <strong>Duration:</strong> {flight.duration}
          </p>
          <p>
            <strong>Price:</strong> {flight.price}
          </p>
          <p>
            <strong>Baggage:</strong> {flight.baggagePolicies}
          </p>
          <p>
            <strong>Layover:</strong> {flight.layoverTimes}
          </p>
          <p>
            <strong>Amenities:</strong> {flight.amenities.join(", ")}
          </p>
          <p>
            <strong>Option:</strong> {flight.option}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Testing;
