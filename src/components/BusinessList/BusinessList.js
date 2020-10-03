import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business";

class BusinessList extends React.Component {
  render() {
    if (this.props.businesses) {
      return (
        <div className="BusinessList">
          {this.props.businesses.map((business) => {
            return <Business business={business} />;
          })}
        </div>
      );
    }
    return (
      <div className="BusinessList">
        <Business business="" />
      </div>
    );
  }
}
export default BusinessList;
