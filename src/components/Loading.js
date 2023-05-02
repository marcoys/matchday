import React from 'react';
import ImgLoading from '../assets/loading.gif';

function Loading() {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h5>Loading..</h5>
      <img src={ImgLoading} alt="로딩중" />
    </div>
  )
}

export default Loading