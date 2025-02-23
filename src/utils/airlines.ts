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
          I want the departureDate: ${flightData.departureDate}
          I want the departureTime: ${flightData.departureTime}
          I want the arrivalDate: ${flightData.arrivalDate}
          I want the arrivalTime: ${flightData.arrivalTime}
          I want the price to be at most: ${flightData.price}
          I want the baggagePolicies to be (do not include the pricing): ${
            flightData.baggagePolicies
          }
          I want the layoverTimes to be at most: ${flightData.layoverTimes}
          I want to depart from: ${flightData.airports.departure}
          I want to arrive at: ${flightData.airports.arrival}
          I want these amenities: ${flightData.amenities.join(", ")}
          I want my flight to be a ${flightData.option}
          `,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type === "text") {
      const textContent = content.text;
      const jsonData = JSON.parse(textContent);
      console.log("jsonData: ", jsonData);
      return jsonData;
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error generating flight options:", error);
    throw error;
  }
};
