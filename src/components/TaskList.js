import React, {Component} from 'react';
import TaskItem from './TaskItem'
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import _ from 'lodash';

class TaskList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			filterName: '',
			filterStatus:-1//all:-1, active:1, deactive:0
		}
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		// this.props.onFilter(
		// 	name==='filterName'?value:this.state.filterName,
		// 	name==='filterStatus'?value:this.state.filterStatus);
		var filter = {
			name: name==='filterName'?value:this.state.filterName,
			status: name==='filterStatus'?value:this.state.filterStatus
		}
		this.props.onFilterTable(filter);
		this.setState({
			[name] : value
		});

	}

	render() {
		var {tasks, filterTable, keyword, sort} = this.props;
		var {filterName, filterStatus} = this.state;

		if(filterTable.name) {
			tasks = _.filter(tasks, (task)=>{
				return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
			});
		}
		//if (filterTable.status) {//null undefine !==0
			tasks = tasks.filter((task)=>{
				if(filterTable.status === -1) {
					return task;
				} else {
					return task.status === (filterTable.status===1?true:false);
				}
			});
		//}		

		// search
		if (keyword) {
			tasks = tasks.filter((task)=>{
					return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
				});
		}

		// sort
		if(sort.by === 'name') {
			tasks.sort((a,b )=>{
				if(a.name>b.name) return sort.value;
				else if(a.name < b.name) return -sort.value;
				else return 0;
			});
		} else {
			tasks.sort((a,b )=>{
				if(a.status>b.status) return -sort.value;
				else if(a.status < b.status) return sort.value;
				else return 0;
			});
		}

		var taskItems = tasks.map(
			(item, index)=>{
				return <TaskItem task={item} index={index} key={item.id} />
			});
		return (
			<table className="table table-bordered table-hover">
				<thead>
					<tr>
						<th className="text-center">No.</th>
						<th className="text-center">Name</th>
						<th className="text-center">Status</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>
							<input type="text" name="filterName" 
								className="form-control" 
								value={filterName} onChange={this.onChange}/>
						</td>
						<td>
							<select className="form-control" name="filterStatus"
								value={filterStatus} onChange={this.onChange}>
								<option value={-1}>All</option>
								<option value={0}>Deactive</option>
								<option value={1}>Active</option>
							</select>
						</td>
						<td></td>
					</tr>
					{ taskItems }
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks,
		filterTable: state.filterTable,
		keyword: state.search,
		sort: state.sort
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		onFilterTable: (filter) => {
			dispatch(actions.filterTask(filter))
		}
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
