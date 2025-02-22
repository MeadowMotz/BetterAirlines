import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputBar = () => {
  const [inputs, setInputs] = useState<string[]>(new Array(5).fill(""));
  const [selectedDates, setSelectedDates] = useState<(Date | null)[]>(new Array(6).fill(null));
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const [activeRectangle, setActiveRectangle] = useState<number | null>(null);
  const rectangleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tripOptions = ["One-Way", "Round-Trip", "Multi-City"];

  // Handle input changes for text rectangles
  const handleInputChange = (index: number, value: string) => {
    let formattedValue = value;

    // Only apply validation for the first two input boxes
    if (index === 0 || index === 1) {
      formattedValue = value.toUpperCase().slice(0, 3); // Convert to uppercase & limit to 3 characters
      if (!/^[A-Z]*$/.test(formattedValue)) return; // Allow only letters (no numbers/symbols)
    }

    const newInputs = [...inputs];
    newInputs[index] = formattedValue;
    setInputs(newInputs);
  };

  // Handle dropdown change for "Trip Type"
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleInputChange(4, event.target.value);
  };

  const handleRectangleClick = (index: number) => {
    if (index === 2 || index === 3) {
      setActiveRectangle(index);
      setIsDatePickerVisible(true);
    }
  };

  const handleDateChange = (date: Date | null, index: number) => {
    const newSelectedDates = [...selectedDates];
    newSelectedDates[index] = date;
    setSelectedDates(newSelectedDates);
    setIsDatePickerVisible(false);
  };

  const placeholders = [
    "Departure Symbol",
    "Return Symbol",
    "Departure Date",
    "Return Date",
    "Trip Type"
 ];

  const handleGoClick = () => {
    const results = inputs.map((input, index) => {
      if (index === 2 || index === 3) {
        return {
          label: placeholders[index],
          value: selectedDates[index] ? selectedDates[index]?.toLocaleDateString() : "No date selected",
        };
      } else {
        return {
          label: placeholders[index],
          value: input || "No input",
        };
      }
    });

    const alertMessage = results.map((item) => `${item.label}: ${item.value}`).join("\n");
    alert(`Submitted Data:\n\n${alertMessage}`);
  };

  return (
    <div className="input">
      {inputs.map((input, index) => {
        if (index === 2 || index === 3) {
          return (
            <div
              key={index}
              ref={(el) => (rectangleRefs.current[index] = el)}
              tabIndex={0}
              className="rectangle-wrapper"
              onClick={() => handleRectangleClick(index)}
            >
              <div className="rectangle">
                {selectedDates[index] ? selectedDates[index]?.toLocaleDateString() : placeholders[index]}
              </div>

              {isDatePickerVisible && activeRectangle === index && (
                <div className="calendar-container" style={{ position: "absolute", zIndex: 999 }}>
                  <DatePicker
                    selected={selectedDates[index]}
                    onChange={(date: Date | null) => handleDateChange(date, index)}
                    inline
                    calendarClassName="calendar"
                  />
                </div>
              )}
            </div>
          );
        } else if (index === 4) {
          // Dropdown for "Trip Type"
          return (
            <div key={index} className="rectangle">
              <select value={input} onChange={handleDropdownChange} className="w-full p-2 border rounded">
                <option value="">Select Trip Type</option>
                {tripOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        } else {
          return (
            <div key={index} className="rectangle">
              <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={placeholders[index]}
                maxLength={index <= 1 ? 3 : undefined} // Max length 3 for first two boxes
              />
            </div>
          );
        }
      })}
      <button className="oval-button" onClick={handleGoClick}>
        Go
      </button>
    </div>
  );
};

export default InputBar;
