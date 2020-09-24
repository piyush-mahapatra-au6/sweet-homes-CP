import React from 'react';
import { connect } from "react-redux";
import { getRoomsByFuzzy } from "../../redux/actions/homeAction";
import { FaSearch } from "react-icons/fa";
class FilterSearch extends React.Component {

  state = {
    value: '',
  }

  editSearchTerm = (e) => {
    this.setState({value: e.target.value})
    // console.log(this.state.value)
    this.props.getRoomsByFuzzy(this.state.value)
  }

//   dynamicSearch = () => {
//     return this.state.names.filter(name => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
//   }


    render(){
      return (
        <div>
          <label>
					<strong>Search <span><FaSearch/></span></strong>:
          <input type= 'text' value = {this.state.value} onChange = {this.editSearchTerm} placeholder = 'Fuzzy Search here :)'/>
          </label>
        </div>
      );
    }
}

export default connect(null,{getRoomsByFuzzy})(FilterSearch);