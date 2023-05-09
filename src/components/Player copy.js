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
                <div>
                  <h1>{player.player.name}</h1>
                  <h2>{player.statistics[0].games.position}</h2>
                </div>
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
                <caption>Games</caption>
                <tbody>
                  <tr>
                    <th>Lineups</th>
                    <td>{player.statistics[0].games.lineups}</td>
                    <th>Appearences</th>
                    <td>{player.statistics[0].games.appearences} games</td>
                  </tr>
                  <tr>
                    <th>Minutes</th>
                    <td>{player.statistics[0].games.minutes} minutes</td>
                    <th>Rating</th>
                    <td>{player.statistics[0].games.rating}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <caption>Substitutes</caption>
                <tbody>
                  <tr>
                    <th>Bench</th>
                    <td>{player.statistics[0].substitutes.bench}</td>
                    <th>In</th>
                    <td>{player.statistics[0].substitutes.in}</td>
                  </tr>
                  <tr>
                    <th>Out</th>
                    <td colSpan={3}>{player.statistics[0].substitutes.out}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <caption>Goals</caption>
                <tbody>
                  <tr>
                    <th>Total</th>
                    <td>{player.statistics[0].goals.total}</td>
                    <th>Assists</th>
                    <td>{player.statistics[0].goals.assists}</td>
                  </tr>
                  <tr>
                    <th>Conceded</th>
                    <td>{player.statistics[0].goals.conceded}</td>
                    <th>Saves</th>
                    <td>{player.statistics[0].goals.saves}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <caption>Passes</caption>
                <tbody>
                  <tr>
                    <th>Total</th>
                    <td>{player.statistics[0].passes.total}</td>
                    <th>Key</th>
                    <td>{player.statistics[0].passes.key}</td>
                  </tr>
                  <tr>
                    <th>Accuracy</th>
                    <td colSpan={3}>{player.statistics[0].passes.accuracy}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <caption>Penalty</caption>
                <tbody>
                  <tr>
                    <th>Scored</th>
                    <td>{player.statistics[0].penalty.scored}</td>
                    <th>Missed</th>
                    <td>{player.statistics[0].penalty.missed}</td>
                  </tr>
                  <tr>
                    <th>Won</th>
                    <td>{player.statistics[0].penalty.won}</td>
                    <th>Commited</th>
                    <td>{player.statistics[0].penalty.commited}</td>
                  </tr>
                  <tr>
                    <th>Saved</th>
                    <td colSpan={3}>{player.statistics[0].penalty.saved}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <caption>Tackles</caption>
                <tbody>
                  <tr>
                    <th>Total</th>
                    <td>{player.statistics[0].tackles.total}</td>
                    <th>Interceptions</th>
                    <td>{player.statistics[0].tackles.interceptions}</td>
                  </tr>
                  <tr>
                    <th>blocks</th>
                    <td colSpan={3}>{player.statistics[0].tackles.null}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <caption>Fouls</caption>
                <tbody>
                  <tr>
                    <th>Drawn</th>
                    <td>{player.statistics[0].fouls.drawn}</td>
                    <th>Committed</th>
                    <td>{player.statistics[0].fouls.committed}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <caption>Cards</caption>
                <tbody>
                  <tr>
                    <th>Yellow</th>
                    <td>{player.statistics[0].cards.yellow}</td>
                    <th>In</th>
                    <td>{player.statistics[0].cards.yellowred}</td>
                  </tr>
                  <tr>
                    <th>Out</th>
                    <td colSpan={3}>{player.statistics[0].cards.red}</td>
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