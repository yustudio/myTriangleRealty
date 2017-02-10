import React, {Component} from 'react';

class Expenses extends Component {
	constructor() {
		super();		
	}

	componentDidMount() {

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
              <div className="col-lg-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => console.log("Going to credit card2")}//this.props.onAddToInvite(this.state.name)}
                >
                  Credit Card2
                </button>
              </div>
            </div>
		)
	}
}

export default Expenses;