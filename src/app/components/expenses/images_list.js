import React, {Component} from 'react';
import _ from 'lodash';
import Image from './image';

const ImagesList = ({images}) => {

	const renderImageList = ()=>(_.map(images, (image, index) => {	

		return (
			<Image key={index}
				   image={image}
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