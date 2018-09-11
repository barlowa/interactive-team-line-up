import React, { Component } from 'react';

class CurrencyConverter extends Component {
  constructor(){
    super()
    this.state = {
      currencyLayerAPI:[],
      loading:false,
      currencyError:'',
    }
  }

  fetchCurrencies(){
      this.setState({
          loading:true,
          currencyError:'',
      })
    //fetch statement to get the currency
    let value = this.props
    fetch(`http://apilayer.net/api/live?access_key=${value.apikey}&source=${value.source}&currencies=${value.currencies}&format=${value.format}`)
    .then( response => {
      if (response.status===200) { //checks for HTTP response code once the promise is returned
        return response.json() 
      }else{
        throw response
      }
    })
    .then((results) => {
      if(results.success){//checks for errors with the API
        this.setState({
            loading:false,
            currencyLayerAPI:results.quotes,
            currencyLayerTimeStamp:results.timestamp,
        })
      }else{
        throw results.error.info
      }
    })
    .catch((error)=>{
      this.setState({
        loading:false,
        currencyError: error
      })
      console.log('Error!',error)
    })
  }
  
  componentDidMount(){
    this.fetchCurrencies()
  }

  componentDidUpdate(prevProps){
    if(prevProps.currencies !== this.props.currencies){
      this.fetchCurrencies()
    }
  }

  render() {
    if(this.state.loading){
        return(
            <div>
                loading...
            </div>
    )}else{
        return (
            <div>
                {
                    this.state.currencyError ? this.state.currencyError : ''
                }
            </div>
        )
    }
  }
}

export default CurrencyConverter;