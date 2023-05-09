import React, { useEffect, useState } from "react";
import '../scss/teamplayers.scss';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TeamPlayers({ teamPlayer }) {
  const [ fade, setFade ] = useState(''); 
  const [ modal, setModal ] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setFade('fade_on');
  }, [])

  const ModalToggle = () => {
    setModal(true);
  }

  return (
    <>
      <div className="bg-black"></div>
      {
        teamPlayer ? 
          [...teamPlayer].map((item, index) => {
            return (
              <>
                <div className={'team-player fade_off ' + fade} onClick={() => navigate(`/player/${item.id}`)} key={index}>
                  <img src={item.photo} alt="" style={{width: '100px'}} />
                  <div>
                    <h1>{item.name}</h1>
                    <p>{item.position}</p>
                    <h5>{item.number}</h5>
                  </div>
                </div>
              </>
            )
          })
        :
        null
      }
    </>
      
  );
}

export default TeamPlayers;
