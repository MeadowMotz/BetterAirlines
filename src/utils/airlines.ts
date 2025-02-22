import axios from "axios";
const params = {
  access_key: "b8496ac866a6ac4c60fca955fffffb5b",
  // access_key: process.env.REACT_APP_ACCESS_KEY,
};

// export const airlineAPI = async () => {
//   axios
//     .get("https://api.aviationstack.com/v1/flights", { params })
//     .then((response) => {
//       const apiResponse = response.data;
//       if (Array.isArray(apiResponse["results"])) {
//         apiResponse["results"].forEach((flight) => {
//           if (!flight["live"]["is_ground"]) {
//             console.log(
//               `${flight["airline"]["name"]} flight ${flight["flight"]["iata"]}`,
//               `from ${flight["departure"]["airport"]} (${flight["departure"]["iata"]})`,
//               `to ${flight["arrival"]["airport"]} (${flight["arrival"]["iata"]}) is in the air.`
//             );
//           }
//         });
//       }

//       console.log(response);
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const airlineAPI = async () => {
  try {
    const response = await axios.get(
      "https://api.aviationstack.com/v1/flights",
      { params }
    );
    const apiResponse = response.data;
    console.log(apiResponse);

    if (apiResponse && Array.isArray(apiResponse["data"])) {
      // Filter flights that are currently in the air
      const activeFlights = apiResponse["data"].filter(
        (flight) => flight["live"] && !flight["live"]["is_ground"]
      );

      return activeFlights; // Return the filtered flight data
    }

    return []; // Return empty array if no data is found
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return []; // Return empty array on error
  }
};
