import React, {Component} from 'react';

const Image = ({image, removeImage}) => (
		
		<tr>
			<td>			
				<img className="receipt-img" src={image.url} alt={'image'} />
				{/*<a href={image.url} download> download </a><br/>*/}
				<button type="button" className="remove-comment"
					onClick={()=>removeImage(image.storageName)}
					>remove</button>
				<div>{image.storageName}</div>				
			</td>
		</tr>
	
);

export default Image;