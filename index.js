const axios = require("axios");
const fs = require("fs/promises");

const { GOOGLE_MAPS_API_KEY: googleMapsApiKey } = process.env

async function getCoordinates(location) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: location,
          key: googleMapsApiKey,
        },
      }
    );
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error(`Error fetching coordinates for ${location}:`, error);
    return { lat: 0, lng: 0 };
  }
}

const main = async () => {
  const rinks = [
    {
      team: "Anaheim Ducks",
      name: "Honda Center",
    },
    {
      team: "Arizona Coyotes",
      name: "Gila River Arena",
    },
    {
      team: "Boston Bruins",
      name: "TD Garden",
    },
    {
      team: "Buffalo Sabres",
      name: "KeyBank Center",
    },
    {
      team: "Calgary Flames",
      name: "Scotiabank Saddledome",
    },
    {
      team: "Carolina Hurricanes",
      name: "PNC Arena",
    },
    {
      team: "Chicago Blackhawks",
      name: "United Center",
    },
    {
      team: "Colorado Avalanche",
      name: "Pepsi Center",
    },
    {
      team: "Columbus Blue Jackets",
      name: "Nationwide Arena",
    },
    {
      team: "Dallas Stars",
      name: "American Airlines Center",
    },
    {
      team: "Detroit Red Wings",
      name: "Little Caesars Arena",
    },
    {
      team: "Edmonton Oilers",
      name: "Rogers Place",
    },
    {
      team: "Florida Panthers",
      name: "BB&T Center",
    },
    {
      team: "Los Angeles Kings",
      name: "Crypto.com Arena",
    },
    {
      team: "Minnesota Wild",
      name: "Xcel Energy Center",
    },
    {
      team: "Montreal Canadiens",
      name: "Bell Centre",
    },
    {
      team: "Nashville Predators",
      name: "Bridgestone Arena",
    },
    {
      team: "New Jersey Devils",
      name: "Prudential Center",
    },
    {
      team: "New York Islanders",
      name: "UBS Arena",
    },
    {
      team: "New York Rangers",
      name: "Madison Square Garden",
    },
    {
      team: "Ottawa Senators",
      name: "Canadian Tire Centre",
    },
    {
      team: "Philadelphia Flyers",
      name: "Wells Fargo Center",
    },
    {
      team: "Pittsburgh Penguins",
      name: "PPG Paints Arena",
    },
    {
      team: "San Jose Sharks",
      name: "SAP Center",
    },
    {
      team: "St. Louis Blues",
      name: "Enterprise Center",
    },
    {
      team: "Tampa Bay Lightning",
      name: "Amalie Arena",
    },
    {
      team: "Toronto Maple Leafs",
      name: "Scotiabank Arena",
    },
    {
      team: "Vancouver Canucks",
      name: "Rogers Arena",
    },
    {
      team: "Vegas Golden Knights",
      name: "T-Mobile Arena",
    },
    {
      team: "Washington Capitals",
      name: "Capital One Arena",
    },
    {
      team: "Winnipeg Jets",
      name: "Canada Life Centre",
    },
    {
      team: "Seattle Kracken",
      name: "Climate Pledge Arena",
    },
  ];

  const data = [];

  for (const rink of rinks) {
    const { team, name } = rink;
    const coordinates = await getCoordinates(name);
    data.push({ team, name, location: coordinates });
  }

  try {
    await fs.writeFile("teamLocations.json", JSON.stringify(data, null, 2));
    console.log("Data written to team_locations.json successfully.");
  } catch (error) {
    console.error("Error writing data to file:", error);
  }
};

main();
