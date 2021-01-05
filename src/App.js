import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from './actions/index';


class App extends Component {
	constructor(props) {
		super(props);
	}
	s4 = () => {
		return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
	}

	generateID = () => {
		return this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4(); 
	}
	onGenerateData = () => {
		var tasks = [
			{
				id: this.generateID(),
				name: 'Learn ReactJS',
				status: true
			},
			{
				id: this.generateID(),
				name: 'Learn Redux',
				status: false
			},
			{
				id: this.generateID(),
				name: 'Learn React Redux',
				status: true
			},
			{
				id: this.generateID(),
				name: 'Learn ES6',
				status: true
			},
			{
				id: this.generateID(),
				name: 'Learn Lodash',
				status: true
			},
			{
				id: this.generateID(),
				name: 'Learn React Router',
				status: false
			},
			{
				id: this.generateID(),
				name: 'Learn Axios',
				status: false
			},
			{
				id: this.generateID(),
				name: 'Learn SpringBoot',
				status: false
			}

		];
		this.props.setTasks(tasks);
	}

	onToggleForm = (event) => {
		if (!this.props.isDisplayForm)
			this.props.onToggleForm();
		this.props.onClearTask({
			id: '',
			name: '', 
			status: false
		});
	}

	render() {
		var {isDisplayForm} = this.props;
		return (
			<div className="container">
				<div className="text-center">
					<h1>Todos Application</h1>
				</div>
				<div className="row mt-30">
					<div className={isDisplayForm?'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
						<TaskForm/>
					</div>
					<div className={isDisplayForm?'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
						<div className="row ml-5">
							<button type="button" className="btn btn-primary"
								onClick={this.onToggleForm}>
								<span className="fa fa-plus"></span>&nbsp;Add Task
							</button>
							<button type="button" className="btn btn-danger ml-5"
								onClick={this.onGenerateData}>
								Generate Data
							</button>
						</div>
						<TaskControl/>
						<div className="row mt-10">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<TaskList/>
							</div>
						</div>
					</div>       
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDisplayForm: state.isDisplayForm
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm: () => {
			dispatch(actions.toggleForm())
		},
		setTasks: (tasks) => {
			dispatch(actions.buildTasks(tasks))
		},
		onClearTask: (task) => {
			dispatch(actions.editTask(task))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
