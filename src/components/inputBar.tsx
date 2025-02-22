import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputBar = () => {
  const [inputs, setInputs] = useState<string[]>(new Array(5).fill(""));
  const [selectedDates, setSelectedDates] = useState<(Date | null)[]>(new Array(6).fill(null));
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const [activeRectangle, setActiveRectangle] = useState<number | null>(null);
  const rectangleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calendarRef = useRef<HTMLDivElement | null>(null); // Ref for the calendar container

  const tripOptions = ["One-Way", "Round-Trip"];

  // Handle input changes
  const handleInputChange = (index: number, value: string) => {
    let formattedValue = value;

    if (index === 0 || index === 1) {
      formattedValue = value.toUpperCase().slice(0, 3);
      if (!/^[A-Z]*$/.test(formattedValue)) return;
    }

    const newInputs = [...inputs];
    newInputs[index] = formattedValue;
    setInputs(newInputs);
  };

  // Handle dropdown change for "Trip Type"
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleInputChange(4, event.target.value);
  };

  // Handle clicking on date rectangles
  const handleRectangleClick = (index: number) => {
    if (index === 2 || index === 3) {
      setActiveRectangle(index);
      setIsDatePickerVisible(true);
    }
  };

  // Close calendar if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(e.target as Node) && 
        !rectangleRefs.current.some((ref) => ref && ref.contains(e.target as Node))
      ) {
        setIsDatePickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle date change
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
                <div ref={calendarRef} className="calendar-container" style={{ position: "absolute", zIndex: 999 }}>
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
                maxLength={index <= 1 ? 3 : undefined}
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
