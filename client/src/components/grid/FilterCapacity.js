import React, { Component } from "react";
import { connect } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { getRoomsByCapacity } from "../../redux/actions/homeAction";
class FilterCapacity extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };

  }

  onChangeValue=(e)=> {
  
    const capacity = e.target.value
    this.props.getRoomsByCapacity(capacity)
  }

  render() {
    return (
      <div onChange={this.onChangeValue}>
          <label><strong>Members <span><FaUsers/>:</span></strong></label>
        <input type="radio" value="2" name="gender" /> 2 Members
        <input type="radio" value="4" name="gender" /> 4 Members
        <input type="radio" value="6" name="gender" /> 6 Members
      </div>
    );
  }
}

export default connect(null,{getRoomsByCapacity})(FilterCapacity);