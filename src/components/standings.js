import React, { useEffect, useState } from "react";
import '../scss/standings.scss';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Standings() {
  const [ fade, setFade ] = useState(''); 

  let store = useSelector((state) => state.standingsData);

  let navigate = useNavigate();

  useEffect(() => {
    setFade('fade_on');
  }, [])

  return (
      <table className={'fade_off ' + fade}>
        <thead>
          <tr>
            <td style={{ width: '40px'}}>순위</td>
            <td>팀 이름</td>
            <td>경기수</td>
            <td>승</td>
            <td>무</td>
            <td>패</td>
            <td>골 득실</td>
            <td>승점</td>
          </tr>
        </thead>
        <tbody>
        {
          store ? 
          [...store.standings[0]].map((item, index) => {
            return (
              <tr key={index}>
                <td style={{textAlign: "center"}}>{item.rank}</td>
                <th style={{ textAlign: 'left'}}>
                  <div onClick={() => {navigate(`/team/${item.team.id}`)}} style={{ display: 'inline-block', cursor: 'pointer' }}>
                    <img src={item.team.logo} alt="" className="team_logo"/>
                    {item.team.name}
                  </div>
                </th>
                <td>{item.all.played}</td>
                <td>{item.all.win}</td>
                <td>{item.all.draw}</td>
                <td>{item.all.lose}</td>
                <td>{item.goalsDiff}</td>
                <td>{item.points}</td>
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

export default Standings;
