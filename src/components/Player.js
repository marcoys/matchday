import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from "./Loading";
import "../scss/player.scss"

function Player() {
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState('');


  let {id} = useParams();

  let store = useSelector((state) => state);

  useEffect(() => {
    setLoading(true);

    axios
      .all([
        axios.get('https://api-football-v1.p.rapidapi.com/v3/players', {
          params: {id: id, season: store.setYear},
          headers: store.setKey
        })
      ])
      .then(
        axios.spread((res1) => {
          setLoading(false);
          setPlayer(res1.data.response[0]);
          console.log(res1.data.response[0]);
        })
      )

  }, []);

  if (loading) return <Loading />;

  return (
    <div className='player'>
      {
        player ?
          <>
            <div className='player-header'>
              <img src={player.player.photo} alt={player.player.name} style={{width: '170px'}}/>
              <div>
                <h1>{player.player.name}</h1>
                <table>
                  <tbody>
                    <tr>
                      <th style={{ width: '80px'}}>National</th>
                      <td style={{ width: '150px'}}>{player.player.nationality}</td>
                      <th style={{ width: '80px'}}>Team</th>
                      <td style={{ width: '150px'}}>{player.statistics[0].team.name}</td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{player.player.height}</td>
                      <th>Weight</th>
                      <td>{player.player.weight}</td>
                    </tr>
                    <tr>
                      <th>Birth</th>
                      <td>{player.player.birth.date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='player-body'>
              <table>
                <tbody>
                  <tr>
                    <th>Position</th>
                    <td>{player.statistics[0].games.position}</td>
                    <th>Appearences</th>
                    <td>{player.statistics[0].games.appearences} games</td>
                    <th>Minutes</th>
                    <td>{player.statistics[0].games.minutes} minutes</td>
                    <th>Rating</th>
                    <td>{player.statistics[0].games.rating}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        :
        null
      }
      
    </div>
  )
}

export default Player