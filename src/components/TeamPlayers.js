import React, { useEffect, useState } from "react";
import '../scss/teamplayers.scss';
import Player from "./Player";


function TeamPlayers({ teamPlayer }) {
  const [ fade, setFade ] = useState('fade_off'); 
  const [ modal, setModal ] = useState(false);
  const [ modalFade, setModalFade ] = useState('');
  const [ id, setId ] = useState('');

  useEffect(() => {
    setFade('fade_on');
  }, [])

  const ModalOpen = item => {
    setId(item.id)
    setModal(!modal)
    setTimeout(() => {
      setModalFade('fade_on')
    }, 200)
  }
  
  const ModalClose = () => {
    setModal(false);
  }

  return (
    <>
      {
        modal ?
        <>
          <div className={`bg-black ${modalFade}`} onClick={() => ModalClose()}></div>
          <Player id={id} modalFade={modalFade} />
        </>
        :
        null
      }
      {
        teamPlayer ? 
          [...teamPlayer].map((item, index) => {
            return (
              <div className={'team-player fade_off ' + fade} onClick={() => ModalOpen(item) } key={index}>
                <img src={item.photo} alt="" style={{width: '100px'}} />
                <div>
                  <h1>{item.name}</h1>
                  <p>{item.position}</p>
                  <h5>{item.number}</h5>
                </div>
              </div>
            )
          })
        :
        null
      }
    </>
      
  );
}

export default TeamPlayers;
