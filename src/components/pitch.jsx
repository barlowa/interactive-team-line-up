import React, { Component } from 'react';
import PlayerCards from './playerCards'
import styled from 'styled-components'

const PitchBackground = styled.div`
  width : 100%;
  height: 100%;
  background-color:#2ead4f;
`

const GoalKeeper = styled.div`

`
const Defence = styled.div`

`

const MidField = styled.div`

`

const Forward = styled.div`

`

class Pitch extends Component {
  constructor(){
    super()
    this.state = {
      positions:{//all different positions as of wikipedia
        GK: [],//default state needed because of .map
        SW: [],
        LB: [],
        CB: [],
        RB: [],
        LWB: [],
        RWB: [],
        DM: [],
        LM: [],
        CM: [],
        RM: [],
        AM: [],
        LW: [],
        SS: [],
        RW: [],
        FW: [],
      },
      endPoint:'players',
    }
  }
  teamPositionSorting(){
    const positions = {}//filtering out positions and putting into an object (sometimes there can be more than one )
    positions.GK = this.props.match.players.filter((item) => { return item.position === 'GK' })
    positions.SW = this.props.match.players.filter((item) => { return item.position === 'SW' })
    positions.LB = this.props.match.players.filter((item) => { return item.position === 'LB' })
    positions.CB = this.props.match.players.filter((item) => { return item.position === 'CB' })
    positions.RB = this.props.match.players.filter((item) => { return item.position === 'RB' })
    positions.LWB = this.props.match.players.filter((item) => { return item.position === 'LWB' })
    positions.RWB = this.props.match.players.filter((item) => { return item.position === 'RWB' })
    positions.DM = this.props.match.players.filter((item) => { return item.position === 'DM' })
    positions.LM = this.props.match.players.filter((item) => { return item.position === 'LM' })
    positions.CM = this.props.match.players.filter((item) => { return item.position === 'CM' })
    positions.RM = this.props.match.players.filter((item) => { return item.position === 'RM' })
    positions.AM = this.props.match.players.filter((item) => { return item.position === 'AM' })
    positions.LW = this.props.match.players.filter((item) => { return item.position === 'LW' })
    positions.SS = this.props.match.players.filter((item) => { return item.position === 'SS' })
    positions.RW = this.props.match.players.filter((item) => { return item.position === 'RW' })
    positions.FW = this.props.match.players.filter((item) => { return item.position === 'FW' })
    this.setState({
      positions: positions, 
    })
    console.log(positions)
  }

  componentDidMount(){
    //when component mounts, fetches the information.
    this.teamPositionSorting()
  }


  //filtered information is then mapped out to position.
  render() {
    const position = this.state.positions
    return(
      <PitchBackground>
        <Forward>
          {position.FW.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
        </Forward>



        <MidField>
        {position.LM.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
          {position.CM.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
          {position.RM.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
        </MidField>


        <Defence>
          {position.LB.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
          {position.CB.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
          {position.RB.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
        </Defence>


        <GoalKeeper>
          {position.GK.map((player)=>{
            return(
              <PlayerCards
              key = {player.playerId}
              playerId = {player.playerId}
              position = {player.position}
              source = {this.props.source}
              endPoint = {this.state.endPoint}
              token = {this.props.token}
              />
            )
          })}
        </GoalKeeper>

      </PitchBackground>


    )
  }
}

export default Pitch;