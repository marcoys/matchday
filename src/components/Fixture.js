import React from 'react';
import '../scss/fixture.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Fixture() {
  const [ fade, setFade ] = useState(''); 
  const [ today, setToday ] = useState('');
  const [ fixture, setFixture ] =useState();

  let store = useSelector((state) => state);

  useEffect(() => {
    setTimeout(() => {
      let now = new Date();
      let day = now.toISOString();

      setToday(day.slice(0, 10))
    }, 100)
  
    setFade('fade_on');

    if(store.fixtureData) {
      let copy = [];
      store.fixtureData.map((item, index) => {
        const data = item.fixture.date;
        const date = data.slice(0,10).toString();

        if(today == date) {
          // console.log(item)
          // console.log(copy)
          copy.push(item);
        }
      })
      setFixture([...copy])
    }
  }, [store])

  return (
    <div className={'fixture fade_off ' + fade}>
      <h5>{today}</h5> 
      <div className='fixture-box'>
        {
          fixture ? 
            fixture.length !== 0 ?
              fixture.map((item, index) => {
                const data = item.fixture.date;

                return (
                  <div key={index} className='feature-board'>
                    <p className='gameTime'>{data.slice(11,16)}</p>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div className='home'>
                          <img src={item.teams.home.logo} alt={item.teams.home.name} className='logo' />
                          <p>{item.teams.home.name}</p>
                          <h4>{item.goals.home}</h4>
                        </div>
                        <h5>VS</h5>
                        <div className='away'>
                          <img src={item.teams.away.logo} alt={item.teams.away.name} className='logo' />
                          <p>{item.teams.away.name}</p>
                          <h4>{item.goals.away}</h4>
                        </div>
                      </div>
                  </div>
                )
                
              })
            : <div className='feature-board no-match'>경기없음</div>
            
          : <div>로딩 실패</div>
        }
      </div>
    </div>
  )
}

export default Fixture