import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: "",
  dangerouslyAllowBrowser: true, // Only use this in a controlled, safe environment
});

// export const generateAirlines = async () => {
//   try {
//     const exampleFlight = {
//       airline: "Delta Air Lines", // Airline as string
//       departureDate: "2024-02-23", // Departure date as string
//       departureTime: "8:30 AM", // Departure time as string
//       arrivalDate: "2024-02-23", // Arrival date as string
//       arrivalTime: "14:45 PM", // Arrival time as string
//       duration: "6h 15m", // Duration as string
//       price: "$449.99", // Price as string
//       baggagePolicies: "1 carry-on bag included", // Baggage policies as string
//       layoverTimes: "2h 30m layover in Atlanta (ATL)", // Layover times as string
//       airports: {
//         departure: "JFK", // Departure airport as string
//         arrival: "LAX", // Arrival airport as string
//       },
//       amenities: [
//         "Wi-Fi",
//         "Power outlets",
//         "In-flight entertainment",
//         "Complimentary snacks",
//         "Beverage service",
//       ], // Amenities as an array of strings
//       option: "Round-Trip", // Flight option (Round-trip or One-way)
//     };

//     const msg = await anthropic.messages.create({
//       model: "claude-3-5-sonnet-20241022", // Double-check if this is the correct model
//       max_tokens: 4000,
//       temperature: 0,
//       system: `Generate a list of 20 flight options. Return the data as a JSON array where each object follows this exact structure:
//       {
//         "airline": string,
//         "departureDate": string,
//         "departureTime": string,
//         "arrivalDate": string,
//         "arrivalTime": string,
//         "duration": string,
//         "price": string,
//         "baggagePolicies": string,
//         "layoverTimes": string,
//         "airports": {
//           "departure": string,
//           "arrival": string
//         },
//         "amenities": string[],
//         "option": string
//       }

//       Use this example for reference: ${JSON.stringify(exampleFlight, null, 2)}

//       Return only the JSON array with no additional text or explanation.`,
//       messages: [
//         {
//           role: "user",
//           content:
//             "Generate 20 realistic flight options between major airports.",
//         },
//       ],
//     });

//     // Assuming `msg.content` contains the raw JSON string response
//     const jsonData = JSON.parse(msg.content.text); // Adjust according to actual response structure
//     return jsonData;
//   } catch (error) {
//     console.error("Error generating flight options:", error);
//     throw error;
//   }
// };

export const generateAirlines = async () => {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0,
      system: ``,
      messages: [
        {
          role: "user",
          content:
            "Generate 20 realistic flight options between major airports in text.",
        },
      ],
    });

    // Type check the content
    const content = msg.content[0];
    if (content.type === "text") {
      console.log("msg: ", msg);
      console.log("msg.content: ", content.text);
      return msg;
    } else {
      throw new Error("Unexpected content type in response");
    }
  } catch (error) {
    console.error("Error generating flight options:", error);
    throw error;
  }
};
