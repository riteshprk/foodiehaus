import React from "react";
import "./Business.css";

class Business extends React.Component {
  getStars(rating) {
    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
    let i;

    // Append all the filled whole stars>
    for (i = rating; i >= 1; i--)
      output.push(<span className="fa fa-star checked"></span>);

    // If there is a half a star, append it
    if (i === 0.5) output.push(<span className="fa fa-star"></span>);

    // Fill the empty stars
    for (i = 5 - rating; i >= 1; i--)
      output.push(<span className="fa fa-star"></span>);
    return output;
  }

  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <img src={this.props.business.imageSrc} alt="" />
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <p>{this.props.business.address}</p>
            <p>{this.props.business.city}</p>
            <p>
              {this.props.business.state}, {this.props.business.zipCode}
            </p>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">
              {this.getStars(this.props.business.rating).map((item) => item)}
            </h3>
            <p>{this.props.business.reviewCount} reviews</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Business;
