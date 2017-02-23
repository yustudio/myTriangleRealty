import { connect } from 'react-redux';
import React, {Component} from 'react';
import {firebaseStorage, firebaseDb} from '../../utils/firebase';
import { addNotes, addExpense, removeExpense, addDate, removeImage, onDropzoneSelect } from '../../actions/expense_actions'
import ImagesList from './images_list';
import { browserHistory, Link, IndexLink } from 'react-router';
import Dropzone from 'react-dropzone';

function mapStateToProps(state) {
	
	const { dbKey, date, notes, loading, images } = state.expense;

	return {	
		dbKey,
		date,
		notes,		
		loading,
		images	
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onNotesUpdate: (notes) => {
			dispatch(addNotes(notes))
		},
		onSubmitExpense: () => {
			dispatch(addExpense())
		},
		// onAddImage: (file) => {
		// 	dispatch(addImage(file))
		// },
		onRemoveExpense: () => {
			dispatch(removeExpense())
		},
		onAddDate: (date) => {
			dispatch(addDate(date))
		},
		removeImage: (imageName) => {
			dispatch(removeImage(imageName))
		},
		onDropzoneSelect: (files) => {
			dispatch(onDropzoneSelect(files))
		},
	}
}

class Expenses extends Component {
	constructor() {
		super();		
	}

	componentDidMount() {		
	}

	_handleRemove(e) {		
		e.preventDefault();		
		this.props.onRemoveExpense();
	}

	//Zip download images
	//http://stackoverflow.com/questions/37176397/multiple-download-links-to-one-zip-file-before-download-javascript/

	_handleSubmit(e) {
		e.preventDefault();		
		this.props.onSubmitExpense();
		//this.refs.fileName.value='';			
	}

	// _handleImageSelect(e) {
	// 	e.preventDefault();			
	// 	this.props.onAddImage(e.target.files);
	// }

	_handleDateSelect(e) {
		e.preventDefault();
		this.props.onAddDate(e.target.value);
	}

	_handleDropzoneSelect(files) {
		console.log(files)
		this.props.onDropzoneSelect(files);
	}

	_handleExpensesList() {
		 //browserHistory.push('/expensesList');
	}

	render() {
	
		return (
			<div className="row">
              <div className="col-lg-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => console.log("Going to credit card1")}//this.props.onAddToInvite(this.state.name)}
                >
                  Credit Card1
                </button>
              </div>
              <p/>
              <p/> 
              <div className="col-lg-12">            
              <label>Date:  </label><input id="expenseDate" type="date" onChange={e=>this._handleDateSelect(e)}/>
              </div>
	          <div className="col-lg-12">                           

	            <form onSubmit={e => this._handleSubmit(e)}>

	            	<label>Notes:  </label>
	            		<input type="text" value={this.props.notes} 
	            			onChange={e => this.props.onNotesUpdate(e.target.value)} 
	            			ref="note"
	            			/>	            	

	        		<div>
		        		<label>Images: </label>	  
			        		<Dropzone ref="dropzone" onDrop={e => this._handleDropzoneSelect(e)}>
		            		 <div>Try dropping some files here, or click to select files to upload.</div>
		            		</Dropzone>      		
		        		{/*}
		        		<input ref="fileName" className="fileInput" type="file" 
		        			 onChange={(e)=>this._handleImageSelect(e)} />	   
		        		*/}
		        		<ImagesList images={this.props.images} removeImage={this.props.removeImage} />
	        		</div>

					{
						this.props.loading ? (
						<span>Loading...</span>
						) : null
					}	        		                                
	                {/*<progress value="0" max="100" id="uploader">{this.state.progress}</progress>*/}
	                {/*<input type="file" value="upload" id="fileButton" />*/}

	               {/*} {this.state.progress === 100 ? (  */}
	                	<p/>
		                <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}> 
		        			Submit 
		        		</button> 		        		
	        		{/* ) : null}  */}
	        		{/*}	<button className="downloadButton" type="submit" onClick={(e)=>this._handleDownload(e)}> 
		        			Download
		        		</button>       	*/}
				        		
		        		{/*<a href="https://firebasestorage.googleapis.com/v0/b/trianglerealty-7618d.appspot.com/o/images%2FWIN_20160210_123851.JPG?alt=media&token=da49df01-459c-4145-b60c-077eee6290ed" download> download </a>*/}
	        			<button className="removeButton" type="submit" onClick={(e)=>this._handleRemove(e)}> 
		        			Remove
		        		</button>

		        		<button className="expensesList" type="submit" onClick={(e)=>this._handleExpensesList(e)}> 
		        			{/*<IndexLink activeClassName='active' to='/expensesList'>Expenses</IndexLink>*/}
		        			<Link to='/expensesList'>Expenses</Link>
		        		</button>

	            </form>
	          </div>
          </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

