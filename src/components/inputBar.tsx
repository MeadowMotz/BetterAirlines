import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './InputBar.module.css'; // Import CSS module
import { generateAirlines } from "../utils/airlines";

const InputBar = () => {
  const navigate = useNavigate();

  // State declarations
  const [airline, setAirline] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [baggagePolicies, setBaggagePolicies] = useState<string>("");
  const [layoverTimes, setLayoverTimes] = useState<string>("");
  const [airports, setAirports] = useState<{ departure: string; arrival: string }>({
    departure: "",
    arrival: "",
  });
  const [amenities, setAmenities] = useState<string[]>([]);
  const [tripOption, setTripOption] = useState<string>("");

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Date picker visibility logic
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const [activeDateField, setActiveDateField] = useState<"departure" | "arrival" | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Options arrays
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

  // Handlers
  const handleDateChange = (date: Date | null, field: "departure" | "arrival") => {
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
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Plan Your Trip</h1>
        
        {/* Grid for Main Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Airline */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Airline</label>
            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className={styles.input}
            >
              <option value="">Select Airline</option>
              {airlineOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Trip Type */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Trip Type</label>
            <select
              value={tripOption}
              onChange={(e) => setTripOption(e.target.value)}
              className={styles.input}
            >
              <option value="">Select Trip Type</option>
              {tripOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Departure Date */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Departure Date</label>
            <div
              className={styles.dateInput}
              onClick={() => {
                setActiveDateField("departure");
                setIsDatePickerVisible(true);
              }}
            >
              {departureDate ? departureDate.toLocaleDateString() : "Select Departure Date"}
            </div>
            {isDatePickerVisible && activeDateField === "departure" && (
              <div ref={calendarRef} className={styles.calendarContainer}>
                <DatePicker
                  selected={departureDate}
                  onChange={(date: Date | null) => handleDateChange(date, "departure")}
                  inline
                />
              </div>
            )}
          </div>

          {/* Arrival Date */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Arrival Date</label>
            <div
              className={styles.dateInput}
              onClick={() => {
                setActiveDateField("arrival");
                setIsDatePickerVisible(true);
              }}
            >
              {arrivalDate ? arrivalDate.toLocaleDateString() : "Select Arrival Date"}
            </div>
            {isDatePickerVisible && activeDateField === "arrival" && (
              <div ref={calendarRef} className={styles.calendarContainer}>
                <DatePicker
                  selected={arrivalDate}
                  onChange={(date: Date | null) => handleDateChange(date, "arrival")}
                  inline
                />
              </div>
            )}
          </div>

          {/* Arrival Airport */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Arrival Airport</label>
            <input
              type="text"
              value={airports.arrival}
              onChange={(e) => setAirports({ ...airports, arrival: e.target.value })}
              placeholder="Arrival Airport"
              className={styles.input}
            />
          </div>

          {/* Price */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$0.00"
              className={styles.input}
            />
          </div>
        </div>

        {/* Symmetrical Layout for Remaining Inputs */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Baggage Policies */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Baggage Policies</label>
            <input
              type="text"
              value={baggagePolicies}
              onChange={(e) => setBaggagePolicies(e.target.value)}
              placeholder="e.g., 1 carry-on bag included"
              className={styles.input}
            />
          </div>

          {/* Layover Times */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Layover Times</label>
            <input
              type="text"
              value={layoverTimes}
              onChange={(e) => setLayoverTimes(e.target.value)}
              placeholder="e.g., 2h 30m layover in Atlanta (ATL)"
              className={styles.input}
            />
          </div>

          {/* Amenities */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Amenities</label>
            <select
              multiple
              value={amenities}
              onChange={(e) => setAmenities(Array.from(e.target.selectedOptions, option => option.value))}
              className={styles.input}
            >
              {amenitiesOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleGoClick}
            style={{ width: '200px', height: '50px' }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Go"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBar;