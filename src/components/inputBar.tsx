import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateAirlines } from "../utils/airlines";

const InputBar = () => {
  const navigate = useNavigate();

  // State for all inputs
  const [airline, setAirline] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [baggagePolicies, setBaggagePolicies] = useState<string>("");
  const [layoverTimes, setLayoverTimes] = useState<string>("");
  const [airports, setAirports] = useState<{
    departure: string;
    arrival: string;
  }>({
    departure: "",
    arrival: "",
  });
  const [amenities, setAmenities] = useState<string[]>([]);
  const [tripOption, setTripOption] = useState<string>("");

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State for date picker visibility
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [activeDateField, setActiveDateField] = useState<
    "departure" | "arrival" | null
  >(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Enums for dropdowns
  const airlineOptions = [
    "Delta Air Lines",
    "American Airlines",
    "United Airlines",
    "Southwest Airlines",
    "Spirit Airlines",
    "Allegiant Air",
    "Hawaiian Airlines",
    "Frontier Airlines",
    "JetBlue Airways",
    "Alaska Airlines",
  ];

  const tripOptions = ["One-way", "Round-Trip"];

  const amenitiesOptions = [
    "Wi-Fi",
    "Power outlets",
    "In-flight entertainment",
    "Complimentary snacks",
    "Beverage service",
  ];

  // Handle date change
  const handleDateChange = (
    date: Date | null,
    field: "departure" | "arrival"
  ) => {
    if (field === "departure") {
      setDepartureDate(date);
    } else if (field === "arrival") {
      setArrivalDate(date);
    }
    setIsDatePickerVisible(false);
  };

  // Handle clicking outside the calendar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsDatePickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submission
  const handleGoClick = async () => {
    setIsLoading(true); // Start loading
    try {
      const flightData = {
        airline,
        departureDate: departureDate?.toISOString().split("T")[0] || "",
        departureTime,
        arrivalDate: arrivalDate?.toISOString().split("T")[0] || "",
        arrivalTime,
        price,
        baggagePolicies,
        layoverTimes,
        airports,
        amenities,
        option: tripOption,
      };

      console.log("Go clicked");
      const generatedFlights = await generateAirlines(flightData);
      console.log("generatedFlights: ", generatedFlights);
      navigate("/airlines", { state: { flights: generatedFlights } });
    } catch (error) {
      console.error("Error generating flights:", error);
    } finally {
      setIsLoading(false); // Stop loading after API call
    }
  };

  return (
    <div className="input">
      {/* Airline Dropdown */}
      <div className="input-field">
        <label>Airline</label>
        <select value={airline} onChange={(e) => setAirline(e.target.value)}>
          <option value="">Select Airline</option>
          {airlineOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Departure Date */}
      <div className="input-field">
        <label>Departure Date</label>
        <div
          className="date-input"
          onClick={() => {
            setActiveDateField("departure");
            setIsDatePickerVisible(true);
          }}
        >
          {departureDate
            ? departureDate.toLocaleDateString()
            : "Select Departure Date"}
        </div>
        {isDatePickerVisible && activeDateField === "departure" && (
          <div ref={calendarRef} className="calendar-container">
            <DatePicker
              selected={departureDate}
              onChange={(date: Date | null) =>
                handleDateChange(date, "departure")
              }
              inline
            />
          </div>
        )}
      </div>

      {/* Arrival Date */}
      <div className="input-field">
        <label>Arrival Date</label>
        <div
          className="date-input"
          onClick={() => {
            setActiveDateField("arrival");
            setIsDatePickerVisible(true);
          }}
        >
          {arrivalDate
            ? arrivalDate.toLocaleDateString()
            : "Select Arrival Date"}
        </div>
        {isDatePickerVisible && activeDateField === "arrival" && (
          <div ref={calendarRef} className="calendar-container">
            <DatePicker
              selected={arrivalDate}
              onChange={(date: Date | null) =>
                handleDateChange(date, "arrival")
              }
              inline
            />
          </div>
        )}
      </div>

      {/* Price */}
      <div className="input-field">
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="$0.00"
        />
      </div>

      {/* Baggage Policies */}
      <div className="input-field">
        <label>Baggage Policies</label>
        <input
          type="text"
          value={baggagePolicies}
          onChange={(e) => setBaggagePolicies(e.target.value)}
          placeholder="e.g., 1 carry-on bag included"
        />
      </div>

      {/* Layover Times */}
      <div className="input-field">
        <label>Layover Times</label>
        <input
          type="text"
          value={layoverTimes}
          onChange={(e) => setLayoverTimes(e.target.value)}
          placeholder="e.g., 2h 30m layover in Atlanta (ATL)"
        />
      </div>

      {/* Trip Option */}
      <div className="input-field">
        <label>Trip Option</label>
        <select
          value={tripOption}
          onChange={(e) => setTripOption(e.target.value)}
        >
          <option value="">Select Trip Type</option>
          {tripOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        className="oval-button"
        onClick={handleGoClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Go"}
      </button>
    </div>
  );
};

export default InputBar;
