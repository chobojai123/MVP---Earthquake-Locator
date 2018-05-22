import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import SearchForm from './SearchForm.jsx';
import Maps from './Maps.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earthquakes: [],
    }
    this.searchQuakes = this.searchQuakes.bind(this);
  }

  componentDidMount() {
    this.getEarthquakes()
  }

  // sets month to last month to show last 30 days' data, need to -1 as 0 = january
  getEarthquakes() {
    const currentDate = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${lastMonth.toDateString()}&endtime=${currentDate.toDateString()}&minmagnitude=4`)
      .then(quake => {this.setState({ earthquakes: quake.data.features})})
      .catch(err => console.log(err))
  }

  searchQuakes(event) { 
    const magnitude = event.target.magnitude.value
    const startDate = event.target.min.value
    const endDate = event.target.max.value
    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=${magnitude}`)
      .then(quake => { this.setState({ earthquakes: quake.data.features }) })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='earthquakes'>
        <h1>Where are the earthquakes?!</h1>
        <SearchForm searchQuakes={this.searchQuakes} />
        <Maps google={this.props.google} earthquakes={this.state.earthquakes}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAlGiX9hHOhS8n8Odrte4BE-n0Io_yz6EE',
  libraries: ['visualization']
})(App);