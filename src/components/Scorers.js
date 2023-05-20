import React, { useEffect, useState } from "react";
import '../scss/scorers.scss';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Player from "./Player";


function Scorers() {
  const [ fade, setFade ] = useState(''); 
  const [ modal, setModal ] = useState(false);
  const [ modalFade, setModalFade ] = useState('');
  const [ id, setId ] = useState('');

  const navigate = useNavigate();

  let store = useSelector((state) => state.topScorersData);

  useEffect(() => {
    setFade('fade_on');
  }, [])

  const ModalOpen = item => {
    window.scrollTo(0, 50);
    setId(item.id)
    setModal(!modal)
    setTimeout(() => {
      setModalFade('fade_on')
    }, 200)
    document.querySelector('body').style.overflow = 'hidden';
  }
  
  const ModalClose = () => {
    setModal(false);
    setModalFade('fade_off')
    document.querySelector('body').style.overflow = 'auto';
  }

  return (
    <>
      {
        modal ?
        <>
          <div className={`bg-black ${modalFade}`} onClick={() => ModalClose()}></div>
          <Player id={id} modalFade={modalFade} modalClose={ModalClose} />
        </>
        :
        null
      }
      <table className={'fade_off ' + fade}>
        <thead>
          <tr>
            <td style={{ width: '40px'}}>순위</td>
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
                <td style={{textAlign: "center"}}>{index + 1}</td>
                <th style={{ paddingLeft: '10px', textAlign: 'left'}}>
                  <div onClick={() => ModalOpen(item.player) } style={{cursor: 'pointer', display: 'inline-block'}}>
                    {item.player.name}
                  </div>
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
    </>
  );
}

export default Scorers;
