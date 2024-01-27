import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  // console.log(searchCountries);
  // console.log(countries)
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);
  useEffect(() => {
    if (searchCountries.length === 0) {
      setCountries(countries);
    }
    if (searchCountries !== "") {
      let filteredData = countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(searchCountries.toLowerCase())
      );
      setCountries(filteredData);
    }
    // console.log(searchCountries.length);
  }, [searchCountries]);

  const countryCard = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const searchInputWrapper = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const searchInput = {
    marginTop: "5px",
    height: "25px",
    width: "50%",
  };
  return (
    <div>
      <div style={searchInputWrapper}>
        <input
          type="text"
          style={searchInput}
          value={searchCountries}
          placeholder="Search for countries..."
          onChange={(e) => setSearchCountries(e.target.value)}
        />
      </div>
      <div style={containerStyle}>
        {countries.map((country) => (
          <div key={country.cca3} style={countryCard}>
            <img
              style={imageStyle}
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
