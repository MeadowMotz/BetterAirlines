import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputBar = () => {
  const [inputs, setInputs] = useState<string[]>(new Array(6).fill("")); 
  const [selectedDates, setSelectedDates] = useState<(Date | null)[]>(new Array(6).fill(null)); 
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false); 
  const [activeRectangle, setActiveRectangle] = useState<number | null>(null); 
  const rectangleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get the position of each rectangle on the page
  const getRectanglePosition = (index: number) => {
    const rect = rectangleRefs.current[index]?.getBoundingClientRect();
    return rect ? rect.top + rect.height : 0; // Position below the rectangle
  };

  // Handle input changes for text rectangles
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleButtonClick = () => {
    // Handle button click (you can customize this function)
  };

  const handleRectangleClick = (index: number) => {
    if (index === 2 || index === 3) {
      setActiveRectangle(index); 
      setIsDatePickerVisible(true); 
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement; // Type as HTMLElement
      // Check if the click is outside the calendar and rectangle elements
      if (
        !rectangleRefs.current.some((ref) => ref && ref.contains(target))
      ) {
        setIsDatePickerVisible(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside); 

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, []);

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
    "Trip Type",
    "Passengers"
  ];

  // New function to handle the "Go" button click and show an alert
  const handleGoClick = () => {
    const results = inputs.map((input, index) => {
      if (index === 2 || index === 3) {
        return {
          label: placeholders[index],
          value: selectedDates[index] ? selectedDates[index]?.toLocaleDateString() : "No date selected"
        };
      } else {
        return {
          label: placeholders[index],
          value: input || "No input"
        };
      }
    });

    // Prepare a string to display in the alert
    const alertMessage = results.map((item) => `${item.label}: ${item.value}`).join("\n");

    // Show the alert with the results
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
                {/* Show the selected date or the corresponding label */}
                {index === 2
                  ? (selectedDates[index] 
                      ? selectedDates[index]?.toLocaleDateString() 
                      : "Departure Date")
                  : (selectedDates[index] 
                      ? selectedDates[index]?.toLocaleDateString() 
                      : "Return Date")}
              </div>

              {isDatePickerVisible && activeRectangle === index && (
                <div 
                  className="calendar-container"
                  style={{
                    position: "absolute",
                    top: `${getRectanglePosition(index) + 10}px`, // Adjusted position to be below the rectangle
                    left: `${rectangleRefs.current[index]?.getBoundingClientRect().left}px`,
                    zIndex: 999,
                  }}
                >
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
        } else {
          return (
            <div key={index} className="rectangle">
              <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={placeholders[index]} 
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
