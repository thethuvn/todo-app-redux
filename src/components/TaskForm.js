import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			id:'',
			name: '',
			status: false
		}
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		if (name==="status")
			value = target.value==="true"?true:false;
		this.setState({
			[name] : value
		});
	}
	onSubmit = (event) => {
		event.preventDefault();
		this.props.onSaveTask(this.state);
		this.onClear();
		this.onCloseForm();
	}
	onClear = () => {
		this.setState({
			name: '',
			status: false
		}
		);
	}
	onCloseForm = () => {
		this.props.onCloseForm();
	}
	componentWillMount() {
		if(this.props.itemEditing){
			this.setState({
				id: this.props.itemEditing.id,
				name: this.props.itemEditing.name,
				status: this.props.itemEditing.status
			});
		} else {
			this.onClear();
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps && nextProps.itemEditing){
			this.setState({
				id: nextProps.itemEditing.id,
				name: nextProps.itemEditing.name,
				status: nextProps.itemEditing.status
			});
		} else {
			this.onClear();
		}
	}

  render() {
  	var {onCloseForm, isDisplayForm} = this.props;
  	var {id} = this.state;

  	if (!isDisplayForm) return null; 

    return (
      <div className="panel panel-warning">
	      <div className="panel-heading">
	        <h3 className="panel-title">
	            {id !== '' ? 'Update Task' : 'Add Task'}
	          <span className="fa fa-times-circle text-right" onClick={onCloseForm}></span></h3>
	      </div>
	      <div className="panel-body">
	          <form onSubmit={this.onSubmit}>
	            <div className="form-group">
	              <label>Name:</label>
	              <input type="text" className="form-control" 
	              	name="name" placeholder="Task Name"
	              	value={this.state.name}
	              	onChange={this.onChange}/>
	            </div>
	            <div className="form-group">
	              <label>Status:</label>
	              <select name="status" className="form-control"
	              	value={this.state.status}
	              	onChange={this.onChange}>
	              	<option value={true}>Active</option>
	              	<option value={false}>Deactive</option>
	              </select>
	            </div>
	            <div className="text-center">
	              <button type="submit" className="btn btn-warning">
	                <span className="fa fa-plus"></span>&nbsp;Submit</button>&nbsp;
	              <button type="reset" className="btn btn-danger"
	              	onClick={this.onClear}>
	                <span className="fa fa-close"></span>&nbsp;Reset</button>
	            </div>
	          </form>
	      </div>
	    </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isDisplayForm: state.isDisplayForm,
		itemEditing: state.itemEditing
	}
};
const mapDispatchToProps = (dispatch, props) => {
	return {
		onSaveTask : (task)=>{
			dispatch(actions.saveTask(task))
		},
		onCloseForm: () => {
			dispatch(actions.closeForm())
		},
		onToggleForm: () => {
			dispatch(actions.toggleForm())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
