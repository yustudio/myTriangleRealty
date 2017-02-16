import React, {Component} from 'react';

const Image = ({imageUrl}) => (
		
		<tr>
			<td>			
				<img className="receipt-img" src={imageUrl} alt={'image'} />
				<a href={imageUrl} download> download </a>
			</td>
		</tr>
	
);

export default Image;