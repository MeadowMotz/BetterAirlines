import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: "",
  dangerouslyAllowBrowser: true, // Only use this in a controlled, safe environment
});
export const generateAirlines = async (flightData: any) => {
  try {
    console.log("flightData: ", flightData);
    const limit: number = 5;
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0,
      system: `Generate ${limit} array of flight options. Return the data as a JSON array where each object follows this exact structure:
      {
        "airline": string,
        "departureDate": string,
        "departureTime": string,
        "arrivalDate": string,
        "arrivalTime": string,
        "duration": string,
        "price": string,
        "baggagePolicies": string,
        "layoverTimes": string,
        "airports": {
          "departure": string,
          "arrival": string
        },
        "amenities": string[],
        "option": string
      }
      Return only the JSON array with no additional text or explanation.`,
      messages: [
        {
          role: "user",
          content: `Generate ${limit} realistic flight options between major airports.
          I want the airline to tbe: ${flightData.airline}
          I want the departureDate (add one to the date): ${
            flightData.departureDate
          }
          I want the departureTime: ${flightData.departureTime}
          I want the arrivalDate (add one to the date): ${
            flightData.arrivalDate
          }
          I want the arrivalTime: ${flightData.arrivalTime}
          I want the price to be at most (don't include a '$'): ${
            flightData.price
          }
          I want the baggagePolicies to be (do not include the pricing): ${
            flightData.baggagePolicies
          }
          I want the layoverTimes to be at most: ${flightData.layoverTimes}
          I want to depart from: ${flightData.airports.departure}
          I want to arrive at: ${flightData.airports.arrival}
          I want these amenities: ${flightData.amenities.join(", ")}
          I want my flight (Can only be One-way or Round-Trip) to be a ${
            flightData.option
          }
          `,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type === "text") {
      const textContent = content.text;
      const jsonData = JSON.parse(textContent);

      // Sorting logic: First by price, then by duration
      jsonData.sort((a: any, b: any) => {
        // Parse price as a number (assuming format "$123" for example)
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        if (priceA === priceB) {
          // If prices are equal, sort by duration
          const durationA = parseFloat(a.duration);
          const durationB = parseFloat(b.duration);
          return durationA - durationB; // Ascending order of duration
        }
        return priceA - priceB; // Ascending order of price
      });

      console.log("Sorted jsonData: ", jsonData);
      return jsonData;
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error generating flight options:", error);
    throw error;
  }
};
