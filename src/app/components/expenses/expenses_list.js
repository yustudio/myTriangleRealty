import { connect } from 'react-redux';
import React, {Component} from 'react';
import {firebaseStorage, firebaseDb} from '../../utils/firebase';
import { updateFilteredExpenses } from '../../actions/expenselist_actions'
import { browserHistory } from 'react-router';
import FixedDataTable from 'fixed-data-table';

function mapStateToProps(state) {
	
	const { allExpenses, filteredExpenses} = state.expenseList;

	return {	
		allExpenses,
		filteredExpenses
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateFilteredExpenses: (filteredExpenses) => {
			dispatch(updateFilteredExpenses(filteredExpenses))
		},
		// setStartDate: (startDate) => {
		// 	dispatch(setStartDate(startDate))
		// },
		// setEndDate: (endDate) => {
		// 	dispatch(setEndDate(endDate))
		// },		
	}
}


const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
      {data[rowIndex][col]}
    </Cell>
  );
  

class ExpensesList extends Component {
 
  constructor(props) {
    super(props);
    this.rows = 
        //this.props.allExpenses;
          [
           {"dbKey":1,"notes":"note 1","date":"2015-02-21","images":[]},
           {"dbKey":2,"notes":"ntoe 2","date":"2016-03-22","images":[]},
           {"dbKey":3,"notes":"note 3","date":"2017-02-24","images":[]},
           {"dbKey":4,"notes":"note 4","date":"2017-08-22","images":[]}
           ];
     let { allExpenses } = this.props;
  	 this.props.updateFilteredExpenses(allExpenses);
  
    // this.state = {
    //   filteredList: this.rows,
    //   sortBy: 'dbKey',
    //   sortDir: null,
    //   startDate: '',
    //   endDate: ''
    // }
  }


  _onFilterChange(col, event) {
      // if (!event.target.value) {
      //   this.setState({
      //     filteredList: this.rows,
      //   });
      // }
      console.log("value in filter change: " + event.target.value)
      console.log("col in filter change: " + col)
      var filterBy = event.target.value.toString().toLowerCase();
      var size = this.rows.length;
      var filteredList = [];
      for (var index = 0; index < size; index++) {
        var v = this.rows[index][col];
        if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
          filteredList.push(this.rows[index]);
        }
      }
      // this.setState({
      //   filteredList: filteredList,
      // });
      updateFilteredList(filteredList);
    }

    _onDateChange(dateType, event) {
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

      // if (dateType === 'startDate' && this.state.endDate === '') {
      //   console.log("startDate only: " + date)  
      //   this.setState({
      //       startDate: date,
      //     });   
      // } else if (dateType === 'endDate' && this.state.startDate === '') {
      //   console.log("endDate only: " + date)
      //   this.setState({
      //       endDate: date,
      //     });
      // } else {
      //   console.log("start: " + this.state.startDate + ", end: " + this.state.endDate)
      // }
 
      // var filterBy = event.target.value.toString().toLowerCase();
      // var size = this.rows.length;
      // var filteredList = [];
      // for (var index = 0; index < size; index++) {
      //   var v = this.rows[index][col];
      //   if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
      //     filteredList.push(this.rows[index]);
      //   }
      // }
      // this.setState({
      //   filteredList: filteredList,
      // });
    }

  
  _headerCell(col) {
      return (
      <div>
        {col.toUpperCase()}       
        {col === "date" ? 
          (
            <div>
            Start 
            <input type="date" style={{width:100+'%'}} onChange={this._onDateChange.bind(this, 'startDate')}/>            
            End 
            <input type="date" style={{width:100+'%'}} onChange={this._onDateChange.bind(this, 'endDate')}/>
            </div>
          )
          : (
            <div>
            <input style={{width:70+'%'}} onChange={this._onFilterChange.bind(this, col)}/>
            </div>
            )
          
        }
      </div>
      )
    }


  render() {


    //var {filteredList} = this.rows
    let { filteredExpenses } = this.props;
    console.log(JSON.stringify(filteredExpenses, null, 2));

    //let filteredList = [1,2,3,4];

    return (
      <div>             
        <Table
          rowHeight={50}
          rowsCount={filteredExpenses.length}
          headerHeight={150}
          width={800}
          height={1000}
          {...this.props}>          
          <Column  
            header={this._headerCell.bind(this,"dbKey")}          
            cell={<TextCell data={filteredExpenses} col="dbKey" />}
            fixed={true}
            width={120}
          />
          <Column
            header={this._headerCell.bind(this,"date")}
            cell={<TextCell data={filteredExpenses} col="date" />}
            fixed={true}
            width={120}
          />
          <Column
            header={this._headerCell.bind(this,"notes")}
            //header={<Cell>Notes</Cell>}
            cell={<TextCell data={filteredExpenses} col="notes" />}
            width={200}
          />         
        </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);