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
        console.log(response);
        const flightData = JSON.parse(response.content[0].text);
        setFlights(flightData);
        setLoading(false);
      } catch (err) {
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
        <div key={index} style={{ marginBottom: "20px" }}>
          <p>Flight {index + 1}:</p>
          <p>Airline: {flight.airline}</p>
          <p>
            Departure: {flight.departureDate} at {flight.departureTime}
          </p>
          <p>
            Arrival: {flight.arrivalDate} at {flight.arrivalTime}
          </p>
          <p>Duration: {flight.duration}</p>
          <p>Price: {flight.price}</p>
          <p>Baggage: {flight.baggagePolicies}</p>
          <p>Layover: {flight.layoverTimes}</p>
          <p>
            Airports: {flight.airports.departure} to {flight.airports.arrival}
          </p>
          <p>Amenities: {flight.amenities.join(", ")}</p>
          <p>Type: {flight.option}</p>
        </div>
      ))}
    </div>
  );
};

export default Testing;
