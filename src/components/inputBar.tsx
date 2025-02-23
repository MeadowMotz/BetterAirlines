import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './InputBar.module.css'; // Import CSS module

const InputBar = () => {
  // State declarations (keep all your existing state)
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

  // Date picker logic (keep your existing logic)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const [activeDateField, setActiveDateField] = useState<"departure" | "arrival" | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Options arrays (keep your existing options)
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

  // Handlers (keep your existing handlers)
  const handleDateChange = (date: Date | null, field: "departure" | "arrival") => {
    if (field === "departure") {
      setDepartureDate(date);
    } else if (field === "arrival") {
      setArrivalDate(date);
    }
    setIsDatePickerVisible(false);
  };

  const handleGoClick = () => {
    const flightData = {
      airline,
      departureDate: departureDate?.toISOString().split("T")[0],
      departureTime,
      arrivalDate: arrivalDate?.toISOString().split("T")[0],
      arrivalTime,
      price,
      baggagePolicies,
      layoverTimes,
      airports,
      amenities,
      option: tripOption,
    };

    alert(`Submitted Data:\n\n${JSON.stringify(flightData, null, 2)}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsDatePickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Plan Your Trip</h1>
        
        {/* 3x3 Grid for Main Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 */}
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

          <div className={styles.inputSection}>
            <label className={styles.label}>Departure Date</label>
            <div
              className={styles.dateInput}
              onClick={() => {
                setActiveDateField("departure");
                setIsDatePickerVisible(true);
              }}
            >
              {departureDate ? departureDate.toLocaleDateString() : "Select Date"}
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

          {/* Row 2 */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Departure Time</label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputSection}>
            <label className={styles.label}>Arrival Date</label>
            <div
              className={styles.dateInput}
              onClick={() => {
                setActiveDateField("arrival");
                setIsDatePickerVisible(true);
              }}
            >
              {arrivalDate ? arrivalDate.toLocaleDateString() : "Select Date"}
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

          <div className={styles.inputSection}>
            <label className={styles.label}>Arrival Time</label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Row 3 */}
          <div className={styles.inputSection}>
            <label className={styles.label}>Departure Airport</label>
            <input
              type="text"
              value={airports.departure}
              onChange={(e) => setAirports({ ...airports, departure: e.target.value })}
              placeholder="Departure Airport"
              className={styles.input}
            />
          </div>

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
        </div>

        {/* Amenities (Full Width) */}
        <div className="mt-4">
          <div className={styles.inputSection}>
            <label className={styles.label}>Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenitiesOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAmenities([...amenities, option]);
                      } else {
                        setAmenities(amenities.filter((item) => item !== option));
                      }
                    }}
                    className="mr-2 h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoClick}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBar;