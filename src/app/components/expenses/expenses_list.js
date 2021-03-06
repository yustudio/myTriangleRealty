import { connect } from 'react-redux';
import React, {Component} from 'react';
import {firebaseStorage, firebaseDb} from '../../utils/firebase';
import { editExpense} from '../../actions/expense_actions'
import { setFilteredExpenses, setStartDate, setEndDate, removeExpense} from '../../actions/expenselist_actions'
import { browserHistory, IndexLink } from 'react-router';
import FixedDataTable from 'fixed-data-table';

function mapStateToProps(state) {
	
	const { allExpenses, filteredExpenses, startDate, endDate } = state.expenseList;

	// console.log("mapStateToProps, allExpenses " + JSON.stringify(allExpenses, null, 2))
	// console.log("mapStateToProps, filteredExpenses " + JSON.stringify(filteredExpenses, null, 2))

	return {	
		allExpenses,
		filteredExpenses,
		startDate,
		endDate
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setFilteredExpenses: (filteredExpenses) => {
			dispatch(setFilteredExpenses(filteredExpenses))
		},
		setStartDate: (startDate) => {
			dispatch(setStartDate(startDate))
		},
		setEndDate: (endDate) => {
			dispatch(setEndDate(endDate))
		},
		removeExpense: (rowIndex) => {
			dispatch(removeExpense(rowIndex))
		},
		editExpense: (e,rowIndex) => {
			dispatch(editExpense(e,rowIndex))
		},
	}
}


const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
      {data[rowIndex][col]}
    </Cell>
  );
  
const ImageCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
      {data[rowIndex][col].length}
    </Cell>
  );

const OptionCell = ({rowIndex, removeExpense, editExpense, ...props}) => {

    	console.log("in OptionCell rowIndex is " + rowIndex)
	   return (
	   	<Cell {...props}> 
	   		
		      <button className="removeButton" type="button" onClick={(e)=>removeExpense(rowIndex)}> 
				  Remove
			  </button>
			   <button className="editButton" type="button" onClick={(e)=>editExpense(e,rowIndex)}> 
				  <IndexLink activeClassName="activeLink" to='/expenses'>Edit</IndexLink>
			   </button>
		
		 </Cell>
		 )
	  };

class ExpensesList extends Component {
 
  constructor(props) {
    super(props);

    //this._filterDate = this._filterDate.bind(this);

    // this.rows = 
    //     //this.props.allExpenses;
    //       [
    //        {"dbKey":1,"notes":"note 1","date":"2015-02-21","images":[]},
    //        {"dbKey":2,"notes":"ntoe 2","date":"2016-03-22","images":[]},
    //        {"dbKey":3,"notes":"note 3","date":"2017-02-24","images":[]},
    //        {"dbKey":4,"notes":"note 4","date":"2017-08-22","images":[]}
    //       ];

     //let { allExpenses, filteredExpenses } = this.props;

    //  console.log("before calling setFilteredExpenses action, allExpenses " + JSON.stringify(allExpenses, null, 2))
  	 // //this.props.setFilteredExpenses(allExpenses);
  	 // console.log("after calling setFilteredExpenses action");
  
    // this.state = {
    //   filteredList: this.rows,
    //   sortBy: 'dbKey',
    //   sortDir: null,
    //   startDate: '',
    //   endDate: ''
    // }
  }


  	_onFilterChange(col, event) {

  	  if (!event.target.value) {
	  	this.props.setFilteredExpenses(this.props.allExpenses);
	  }
      
      var filterBy = event.target.value.toString().toLowerCase();
      var size = this.props.allExpenses.length;
      var filteredList = [];
      for (var index = 0; index < size; index++) {
        var v = this.props.allExpenses[index][col];
        console.log("_onFilterChange original value " + v)
        console.log("event.target.value input value " + event.target.value)
        if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
          console.log("match on field");
          filteredList.push(this.props.allExpenses[index]);
        }
      }
    
      this.props.setFilteredExpenses(filteredList);
    }

    _filterDate(start, end) {
    	console.log("inside filterDate, start " + start + " end " + end);

		if (start && !end) {
			console.log("start only")
			var size = this.props.allExpenses.length;
	      	var filteredList = [];
	      	for (let index = 0; index < size; index++) {
	        	let v = this.props.allExpenses[index]['date'];
	        	if (v >= start) {
	          		filteredList.push(this.props.allExpenses[index]);
	        	}
	      	}
			this.props.setFilteredExpenses(filteredList);
		}
		else if (!start && end) {
			console.log("end only");
			let size = this.props.allExpenses.length;
	      	let filteredList = [];
	      	for (let index = 0; index < size; index++) {
	        	let v = this.props.allExpenses[index]['date'];
	        	console.log("current date is: " + v)
	        	if (v <= end) {
	        		console.log("matched date: " + v)
	          		filteredList.push(this.props.allExpenses[index]);
	        	}
	      	}
			this.props.setFilteredExpenses(filteredList);
		} else {
			console.log("start and end")
			var size = this.props.allExpenses.length;
	      	var filteredList = [];
	      	for (let index = 0; index < size; index++) {
	        	let v = this.props.allExpenses[index]['date'];
	        	if (v <= end && v >= start) {
	          		filteredList.push(this.props.allExpenses[index]);
	        	}
	      	}
			this.props.setFilteredExpenses(filteredList);
		}  	
  }

    _onDateChange = (dateType, event) => {
      // console.log("start: " + this.refs.startDate.value)
      // console.log("end: " + this.refs.endDate.value)
        
      console.log("dataType: " + dateType)
      console.log("event.target.value: " + event.target.value)

      let date = event.target.value;

      // if (!date) {
      //   this.setState({
      //     filteredList: this.rows,
      //   });
      // }
      // console.log("startDate is originally: " + this.props.startDate)  
      // console.log("endDate is originally: " + this.props.startDate)  

      if (dateType === 'startDate' && !this.props.endDate) {
        console.log("startDate only: " + date)
        this._filterDate.bind(this, date, '')();        
        this.props.setStartDate(date);        
      } else if (dateType === 'endDate' && !this.props.startDate) {
        console.log("endDate only: " + date)
        this._filterDate.bind(this, '', date)();
        this.props.setEndDate(date);
      } else {

        if (dateType === 'endDate') {
        	this._filterDate.bind(this, this.props.startDate, date)();
        	this.props.setEndDate(date);
    	} else if (dateType === 'startDate') {
    		this._filterDate.bind(this, date, this.props.endDate)();
        	this.props.setStartDate(date);
    	}

      }      
    }


	_onImageChange(col, event) {  
	  if (!event.target.value) {
	  	this.props.setFilteredExpenses(this.props.allExpenses);
	  }
    
      var size = this.props.allExpenses.length;
      var filteredList = [];
      for (var index = 0; index < size; index++) {
        var v = this.props.allExpenses[index][col].length;
        console.log("_onImageChange entry images length is " + v)
        console.log("event.target.value " + event.target.value)
        if (v.toString().indexOf(event.target.value) !== -1) {
          filteredList.push(this.props.allExpenses[index]);
        }
      }
    
      this.props.setFilteredExpenses(filteredList);
    }
  
  _headerCell(col) {
  	let headerFilter;

  	 if (col === "date") {
  	 	headerFilter = (
		 	<div>
	        Start 
	        <input type="date" style={{width:100+'%'}} onChange={this._onDateChange.bind(this, 'startDate')}/>            
	        End 
	        <input type="date" style={{width:100+'%'}} onChange={this._onDateChange.bind(this, 'endDate')}/>
	        </div>
  	 )} else if (col === "images") {
  	 	headerFilter = (
  	 		<div>
			<input style={{width:70+'%'}} onChange={this._onImageChange.bind(this, col)}/>
			</div>			
  	 )} else {
 		headerFilter = (
			<div>
			<input style={{width:70+'%'}} onChange={this._onFilterChange.bind(this, col)}/>
			</div>
	 )}

	return (
      <div>
        {col.toUpperCase()}       
        {headerFilter}
      </div>
      )
    }   


  render() {

    let { filteredExpenses } = this.props;
    //console.log("in render, filteredExpenses: " + JSON.stringify(filteredExpenses, null, 2));

    return (
      <div> 
      	<button className="submitButton">
        	<IndexLink activeClassName="activeLink" to='/expenses'>Add Another Expense</IndexLink>
        </button> 
        <p/>           
        <Table
          rowHeight={80}
          rowsCount={ filteredExpenses.length }
          headerHeight={150}
          width={800}
          height={1000}
          {...this.props}>          
          <Column  
            header={this._headerCell.bind(this,"dbKey")}          
            cell={<TextCell data={filteredExpenses} col="dbKey" />}
            fixed={true}
            width={150}
          />
          <Column
            header={this._headerCell.bind(this,"date")}
            cell={<TextCell data={filteredExpenses} col="date" />}
            fixed={true}
            width={150}
          />
          <Column
            header={this._headerCell.bind(this,"notes")}
            //header={<Cell>Notes</Cell>}
            cell={<TextCell data={filteredExpenses} col="notes" />}
            width={200}
          />
          <Column
            header={this._headerCell.bind(this,"images")}
            //header={<Cell>Notes</Cell>}
            cell={<ImageCell data={filteredExpenses} col="images" />}
            width={200}
          /> 
          <Column            
            header={<Cell>Options</Cell>}
            cell={<OptionCell removeExpense={this.props.removeExpense.bind(this)} 
            				  editExpense={this.props.editExpense.bind(this)}
            		/>}
            width={100}
          />         
        </Table>

        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);