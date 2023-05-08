import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from "./Loading";
import "../scss/team.scss"
import TeamPlayers from './TeamPlayers';
import Player from './Player';
import { Route, Routes, useNavigate } from "react-router-dom";


function Team({ league }) {
  const [loading, setLoading] = useState(false);
  const [ teamInfo, setTeamInfo ] = useState('');
  const [ teamStat, setTeamStat ] = useState('');
  const [ teamPlayer, setTeamPlayer ] = useState('');

  let {id} = useParams();

  let store = useSelector((state) => state);

  useEffect(() => {
    setLoading(true);

    axios
      .all([
        axios.get('https://api-football-v1.p.rapidapi.com/v3/teams', {
          params: {id: id},
          headers: store.setKey
        }),
        axios.get('https://api-football-v1.p.rapidapi.com/v3/teams/statistics', {
          params: {league: league, season: store.setYear, team: id},
          headers: store.setKey
        }),
        axios.get('https://api-football-v1.p.rapidapi.com/v3/players/squads', {
          params: {team: id},
          headers: store.setKey
        })
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          setLoading(false);
          setTeamInfo(res1.data.response[0]);
          setTeamStat(res2.data.response);
          setTeamPlayer(res3.data.response[0].players);
          // console.log(res1.data.response[0]);
          // console.log(res2.data.response);
          console.log(res3.data.response[0].players);
        })
      )

  }, []);

  if (loading) return <Loading />;

  return (
    <div className='team'>
      {
        teamInfo ?
        <div className='team-Info' >
          <div className='team-header'>
            <img src={`${teamInfo.team.logo}`} alt="logo" />
            <div>
              <h1>{teamInfo.team.name}</h1>
              <h2>{teamInfo.venue.name}</h2>
              <div className='game'>
                <div>G {teamStat.fixtures.played.total}</div>
                <div>W {teamStat.fixtures.wins.total} </div>
                <div>D {teamStat.fixtures.draws.total} </div>
                <div>L {teamStat.fixtures.loses.total} </div>
              </div>
              <h3>최근 5경기 - {teamStat.form.slice(-5)}</h3>
            </div>
          </div>
          <div className='team-body'>
            <TeamPlayers teamPlayer={teamPlayer} />
          </div>
        </div>
        : null
      }

    </div>
  )
}

export default Team