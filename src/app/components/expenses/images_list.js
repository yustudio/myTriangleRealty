import React, {Component} from 'react';
import _ from 'lodash';
import Image from './image';

const ImagesList = ({images, removeImage}) => {

	const renderImageList = ()=>(_.map(images, (image, index) => {	

		return (
			<Image key={index}
				   image={image}
				   removeImage={removeImage}
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