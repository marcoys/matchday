import React, { useEffect, useState } from "react";
import '../scss/scorers.scss';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Scorers() {
  const [ fade, setFade ] = useState(''); 

  const navigate = useNavigate();

  let store = useSelector((state) => state.topScorersData);

  useEffect(() => {
    setFade('fade_on');
  }, [])

  return (
      <table className={'fade_off ' + fade}>
        <thead>
          <tr>
            <td>순위</td>
            <td>이름</td>
            <td>팀</td>
            <td>출전</td>
            <td>골</td>
          </tr>
        </thead>
        <tbody>
        {
          store ? 
          [...store].map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <th style={{ paddingLeft: '5px'}}>
                  {item.player.name}
                </th>
                <td style={{ textAlign: 'left', paddingLeft: '5px'}}>
                  <div onClick={() => {navigate(`/team/${item.statistics[0].team.id}`)}} style={{ display: 'inline-block', cursor: 'pointer' }}>
                    <img src={item.statistics[0].team.logo} alt="" className="team_logo"/>
                    {item.statistics[0].team.name}
                  </div>
                </td>
                <td>
                  {item.statistics[0].games.appearences} 경기
                </td>
                <td>
                  {item.statistics[0].goals.total} 골
                </td>
              </tr>
            );
          })
          : 
          <tr><td>로딩실패</td></tr>
        }
        </tbody>
      </table>
  );
}

export default Scorers;
