import { configureStore, createSlice } from '@reduxjs/toolkit';

const setKey = createSlice({
  name : 'setKey',
  initialState: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': process.env.REACT_APP_MATCHDAY_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_MATCHDAY_API_HOST
  },
  reducers : {

  }
})


const setYear = createSlice({
  name : 'year',
  initialState: '2022',
  reducers : {
    getYear(state, action) {
      return state = action.payload;
    }
  }
})

export let { getYear } = setYear.actions;

const standingsData = createSlice({
  name: 'standingsData',
  initialState: '',
  reducers : {
    getStandings(state, action) {
      console.log('action', action.payload);
      return state = action.payload;
    }
  }
})

export let { getStandings } = standingsData.actions;

const fixtureData = createSlice({
  name: 'fixtureData',
  initialState: '',
  reducers : {
    getFixture(state, action) {
      // console.log('action', action.payload);
      return state = action.payload;
    }
  }
})

export let { getFixture } = fixtureData.actions;

const topScorersData = createSlice({
  name: 'topScorersData',
  initialState: '',
  reducers: {
    getScorers(state, action) {
      console.log('action', action.payload);
      return state = action.payload;
    }
  }
})

export let { getScorers } = topScorersData.actions;

export default configureStore({
  reducer: {
    setKey : setKey.reducer,
    setYear : setYear.reducer,
    standingsData : standingsData.reducer,
    fixtureData: fixtureData.reducer,
    topScorersData: topScorersData.reducer
  }
}) 
