import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Standing from "./components/standings";

function App() {
  const [data, setData] = useState({
    leagues: [
      { id: 2002, name: "Bundesliga" },
      { id: 2014, name: "Primera Division" },
      { id: 2015, name: "Ligue 1" },
      { id: 2019, name: "Serie A" },
      { id: 2021, name: "Premier League" },
    ],
    standing: [],
    selectedLeague: "",
  });

  useEffect(() => {
    const Token = "fb4183844b7c4886baf350628d41f182";
    let URL =
    "https://api.football-data.org/v2/competitions/" + 2021 + "/standings";
      // "https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/competitions/" + 2021 + "/standings";

    axios.get(URL, { headers: { "X-Auth-Token": Token } }).then((response) => {
      console.log(response.data)
    });
  
    return () => {

    }
  }, [])


  return (
    <div className="App">

    </div>
  );
}

export default App;
