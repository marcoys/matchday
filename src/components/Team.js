import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from "./Loading";

function Team({ league }) {
  const [loading, setLoading] = useState(false);
  const [ teamInfo, setTeamInfo ] = useState('');
  const [ teamStat, setTeamStat ] = useState('');

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
        })
      ])
      .then(
        axios.spread((res1, res2) => {
          setLoading(false);
          setTeamInfo(res1.data.response[0]);
          setTeamStat(res2.data.response);
          console.log(res1.data.response[0]);
          console.log(res2.data.response);
        })
      )

  }, []);

  if (loading) return <Loading />;

  return (
    <div className='team-info'>
      {
        teamInfo ?
        <>
          <img src={`${teamInfo.team.logo}`} alt="logo" />
          <h1>{teamInfo.team.name}</h1>
          <div>{teamInfo.venue.name}</div>
        </>
        : null
      }
    </div>
  )
}

export default Team