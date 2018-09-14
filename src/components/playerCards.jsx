import React, { Component } from 'react';
import styled from 'styled-components'
import playerSprite from '../images/player.png'


const Cards = styled.div`
  display: inline-block;
  width: 150px;
  height: 160px;
  vertical-align: middle;
  text-align: center;
  margin: 10px;
`

const ResultCard = styled.div`
  display: grid;
  border-radius: 5px;
  min-height: 160px;
  padding: 5px;
  background-color: rgba(255,255,255,0.5);
`

class PlayerCards extends Component {
  constructor(){
    super()
    this.state = {
      loading: false,
      showExtraInfo:false,
      error: '',
      results: {}
    }
  }

  //fetches extra player information from the API
  extraPlayerInfo = () => {
    //if statement to check for empty object in state. Should only run once.
    if(Object.keys(this.state.results).length === 0){
      this.setState({
        loading:true,
        error:'',
    })
    //fetch statement to get the players info from the api using props. 
    let param = this.props
    fetch(`${param.source}/${param.endPoint}?token=${param.token}&playerId=${param.playerId}`)
    .then( response => {
      if (response.status===200) { 
        return response.json() 
      }else{
        throw response
      }
    })
    .then((results) => {

      this.setState({
        loading:false,
        showExtraInfo: true,//shows the extra info once loaded.
        results:results,
      })
    })
    .catch((error)=>{
      this.setState({
        loading:false,
        error: error
      })
      console.log('Error!',error)
    })
    }else{//Shows the extra information if the array is not empty.
      this.setState({
        showExtraInfo: true,
      })
    }
  }

  //bound to a button. Hides the info
  hideInfo = () => {
    this.setState({
      showExtraInfo: false,
    })
  }
  

  render() {
    //extra info is set to show when user hovers over player 
    return(
      <Cards
        onMouseEnter={this.extraPlayerInfo}
      >
        {this.state.error? 'Unavailable' : ''}  
        
        {this.state.showExtraInfo && !this.state.loading && !this.state.error? 
        <ResultCard>
          <div>Position: {this.props.position}</div>
          <div>Name: {this.state.results.name}</div>
          <div>Played: {this.state.results.played}</div>
          <div>Goals: {this.state.results.goals}</div>
          <div>Yellow Cards: {this.state.results.yellowCards}</div>
          <div>Red Cards{this.state.results.redCards}</div>
          <button onClick={this.hideInfo}
          >
            Hide
          </button>
        </ResultCard>

        : <div>          
            <div>{this.props.position}</div>
            <img src = {playerSprite} alt = {this.props.position} /> 
        </div>}
      </Cards>
    )  
  }
}
export default PlayerCards;