import React, { Component } from 'react';

class GetFixtures extends Component {
  constructor(){
    super()
    this.state = {
      loading: true,
      error: '',
      match:{//put into match object, incase there is more than one match on the same day? tournament?
        date:'',
        location:'',  
        awayTeam : [],
        homeTeam : [],
      }
    }
  }

  fetchFixures(){
      this.setState({
          loading:true,
          error:'',
      })
    //fetch statement to get the fixtures from the api using props. 
    let param = this.props
    fetch(`${param.source}/${param.endPoint}?token=${param.token}&fixtureId=${param.fixtureId}`)
    .then( response => {
      if (response.status===200) { //checks for HTTP response code once the promise is returned
        return response.json() 
      }else{
        throw response
      }
    })
    .then((results) => {

      this.setState({
        loading:false,
        match:{//put into match object, incase there is more than one match on the same day? tournament?
          date:results.date,
          location:results.location,  
          awayTeam : results.teams.find((item) => {
            return item.homeTeam === false
          }),
          homeTeam : results.teams.find((item) => {
            return item.homeTeam === true
          })
        }
      })
    })
    .catch((error)=>{
      this.setState({
        loading:false,
        error: error
      })
      console.log('Error!',error)
    })
  }
  
  componentDidMount(){
    //innitial fetch
    this.fetchFixures()
  }

  componentDidUpdate(prevProps){
    //updates if the fixture id changes
    if(prevProps.fixtureId !== this.props.fixtureId){
      this.fetchFixures()
    }
  }

  render() {
   
    
    if(this.state.loading || this.state.error){
      return(        
        <div>
          {this.state.error? 'We have thrown the towel in! there has been a catastrophic error, try again later' : ' loading...'}
        </div>
      )
    }else{
      return(
      <div>
        <div>date: {this.state.match.date} at {this.state.match.location}</div>
        <div>
          Home Team
          {this.state.match.homeTeam.players.map((team,index)=>{
            return(
              <div key={index}>
                <div>{team.playerId}</div>
                <div>{team.position}</div>
              </div>
            )
          })}
        </div>
        <div>
          Away Team
          {this.state.match.awayTeam.players.map((team,index)=>{
            return(
              <div key={index}>
                <div>{team.playerId}</div>
                <div>{team.position}</div>
              </div>
            )
          })}
        </div>
      </div>
      )
    }
  }
}
export default GetFixtures;