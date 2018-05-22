import React, { Component } from 'react';


class SearchForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    // pass back data to App.jsx
    this.props.searchQuakes(event)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label className="filter-column">Magnitude</label>
          <br />
          <select name="magnitude">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <br />
          <label className="filter-column">Date Range:</label><br />
          <input type="date" name="min" />
          <input type="date" name="max" />
          <input type="submit" className="myButton" />
        </form>
      </div>
    )
  }
}

export default SearchForm;