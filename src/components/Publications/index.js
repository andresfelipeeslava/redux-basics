import React, { Component } from 'react';
import { withRouter } from "react-router";

class Publications extends Component {
  
  render() {
    return (
      <div>
        {this.props.match.params.key}
      </div>
    )
  }
}

export default withRouter(Publications);
