import logo from "./logo.svg";
import "./scss/App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Standings from "./components/Standings";
import Fixture from "./components/Fixture";
import Scorers from "./components/Scorers";
import Team from "./components/Team";
import Player from "./components/Player";
import { useDispatch, useSelector } from "react-redux";
import { getStandings, getFixture, getScorers, getYear } from "./store";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [league, setLeague] = useState(39);
  
  let store = useSelector((state) => state);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    let now = new Date();
    let season = now.getFullYear() - 1;

    dispatch(getYear(season));
    
    const optionStanding = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
      params: {season: store.setYear, league: league},
      headers: store.setKey
    };

    axios.request(optionStanding).then(function (response) {
      // console.log(response.data);
      setLoading(false);
      dispatch(getStandings(response.data.response[0].league))
    }).catch(function (error) {
      console.error(error);
      setError(Error);
    });

    axios
    .all([
      axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
        params: {season: store.setYear, league: league},
        headers: store.setKey
      }),
      axios.get('https://api-football-v1.p.rapidapi.com/v3/players/topscorers', {
        params: {season: store.setYear, league: league},
        headers: store.setKey
      })
    ])
    .then(
      axios.spread((res1, res2) => {
        dispatch(getFixture(res1.data.response));
        dispatch(getScorers(res2.data.response));
      })
    )

  }, [league]);


  if (loading) return <Loading />;

  if (error) return <div>로딩 실패..{error}</div>;

  if (!store) return null;

  return (
    <div className="App">
      <header>
        <div className="title">
          <img src={store.standingsData.logo} alt="" />
          <h1>{store.standingsData.name}</h1>
        </div>
        <div className="select_league">
          <div onClick={() => {setLeague(39); navigate('/')} }>
            <img src={process.env.PUBLIC_URL + '/images/England-flag.png'} alt="" />
          </div>
          <div onClick={() => {setLeague(140); navigate('/')}}>
            <img src={process.env.PUBLIC_URL + '/images/Spain-flag.png'} alt="" />
          </div>
          <div onClick={() => {setLeague(135); navigate('/')}}>
            <img src={process.env.PUBLIC_URL + '/images/Italy-flag.png'} alt="" />
          </div>
          <div onClick={() => {setLeague(78); navigate('/')}}>
            <img src={process.env.PUBLIC_URL + '/images/Germany-flag.png'} alt="" />
          </div>
          <div onClick={() => setLeague(61)}>
            <img src={process.env.PUBLIC_URL + '/images/France-flag.png'} alt="" />
          </div>
        </div>
      </header>
      

      <Routes>
        <Route path="/" element={
          <div className="container">
            <Fixture />
            <div className="table-box">
              <Standings />
              <Scorers />
            </div>
          </div>
        } />
        <Route path="/team/:id" element={<Team league={league} />}/>
        <Route path="/player/:id" element={<Player />}/>
      </Routes>
    </div>
  );
}

export default App;
