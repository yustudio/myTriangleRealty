import React, {Component} from 'react';

const Image = ({image}) => (
		
		<tr>
			<td>			
				<img className="receipt-img" src={image.url} alt={'image'} />
				<a href={image.url} download> download </a>
				<div>{image.storageName}</div>
			</td>
		</tr>
	
);

export default Image;