import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskSortControl extends Component {

	onClick = (sortBy, sortValue) => {
		this.props.onSort({
			by: sortBy, 
			value: sortValue
		});
	}

  render() {
  	var { by, value } = this.props.sort;
    return (
		<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
	      <div className="dropdown">
	        <button type="button" 
	          data-toggle="dropdown"
	          aria-haspopup="true"
	          aria-expanded="true"
	          className="btn btn-primary dropdown-toggle">Sort&nbsp;
	            <span className="fa fa-sort-alpha-asc"></span></button>
	          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
	            <li onClick={()=>this.onClick('name', 1)}>
	              <a role="button" className={(by==='name' && value===1)?'sort_selected':''}
	              	  >
	                <span className="fa fa-sort-alpha-asc">Name A-Z</span>
	              </a>
	            </li>
	            <li onClick={()=>this.onClick('name', -1)}>
	              <a role="button" className={(by==='name' && value===-1)?'sort_selected':''}>
	                <span className="fa fa-sort-alpha-desc">Name Z-A</span>
	              </a>
	            </li>
	            <li role="separator" className="divider"></li>
	            <li onClick={()=>this.onClick('status', 1)}>
	              <a role="button" className={(by==='status' && value===1)?'sort_selected':''} >
	                Active
	              </a>
	            </li>
	            <li onClick={()=>this.onClick('status', -1)}>
	              <a role="button" className={(by==='status' && value===-1)?'sort_selected':''}>
	                Deactive
	              </a>
	            </li>
	          </ul>
	      </div>    
	    </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
		sort: state.sort
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		onSort: (sort) => {
			dispatch(actions.sortTask(sort));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl);
