import React, { Component } from 'react';
import Pitch from '../components/pitch'
class GetFixtures extends Component {
  constructor(){
    super()
    this.state = {
      loading: true,
      error: '',
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
          date: new Date(results.date),
          location:results.location,  
          awayTeam : results.teams.find((item) => {//splits up the home and away team
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
    //provisions for updates if the fixture id changes in the future and site is made more dynamic.
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
        <div>{this.state.match.date.toLocaleDateString()} at {this.state.match.location}</div>
        <div>
          Home Team
        </div>
        <div>
          {this.state.match.homeTeam.name}
        </div>
        <Pitch
          match={this.state.match.homeTeam}
          source = {this.props.source}
          token = {this.props.token}
        />
        <div>
          Away Team
        </div>
        <div>
          {this.state.match.awayTeam.name}
        </div>
        <Pitch
          match={this.state.match.awayTeam}
          source = {this.props.source}
          token = {this.props.token}
        />
      </div>
      )
    }
  }
}
export default GetFixtures;