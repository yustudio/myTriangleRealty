import React from 'react';
import { Link, IndexLink } from 'react-router';

export default () => {
  return (
  	<div> 

  		<div>Home Page of our application! </div>

  	<button className="submitButton" type="submit"> 
		<IndexLink activeClassName="activeLink" to='/expenses'>Add Expense</IndexLink>
	</button>

	</div>
  	);
};
