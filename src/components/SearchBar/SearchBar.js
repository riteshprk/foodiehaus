import React from "react";
import "./SearchBar.css";

function validate(term, location) {
  // true means invalid, so our conditions got reversed
  return {
    term: term.length === 0,
    location: location.length === 0,
  };
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
      term: "",
      location: "",
      touched: {
        term: false,
        location: false,
      },
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    }
    return "";
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  canBeSubmitted() {
    const errors = validate(this.state.term, this.state.location);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    return !isDisabled;
  }

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption });
  }
  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }
  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }
  handleSearch(event) {
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );

    event.preventDefault();
  }
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }
  render() {
    const errors = validate(this.state.term, this.state.location);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="SearchBar">
          <div className="SearchBar-sort-options">
            <ul>{this.renderSortByOptions()}</ul>
          </div>

          <div className="SearchBar-fields" id="inputFields">
            <input
              onChange={this.handleTermChange}
              placeholder="Search Businesses"
              type="text"
              className={errors.term ? "error" : ""}
              onBlur={this.handleBlur("term")}
              value={this.state.term}
            />
            <input
              onChange={this.handleLocationChange}
              placeholder="Where?"
              type="text"
              className={errors.location ? "error" : ""}
              onBlur={this.handleBlur("location")}
              value={this.state.location}
            />
          </div>
          <div className="SearchBar-submit">
            <button disabled={isDisabled} onClick={this.handleSearch}>
              Let's Go
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
