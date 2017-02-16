import React, {Component} from 'react';
import _ from 'lodash';
import Image from './image';

const ImagesList = ({imageUrls, imageName}) => {

	const renderImageList = ()=>(_.map(imageUrls, (imageUrl, index) => {	

		return (
			<Image key={index}
				   imageUrl={imageUrl}
			/>
		)}
	));

	return (
		<table>
			<tbody>				
				{renderImageList()}				
			</tbody>
		</table>
	)
}

export default ImagesList;