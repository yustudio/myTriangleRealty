import React, {Component} from 'react';

//const Image = ({image, removeImage}) => (
class Image extends Component {

	constructor() {
		super();		
	}	

	render() {

		const { image, removeImage }= this.props;
		return (
			<tr>
				<td>	
					<div>							
					{/*<img className="receipt-img" src={image.previewUrl} alt={'image'} />*/}
					{/*<a href={image.url} download> download </a><br/>*/}					

					{/*Use id here so that action can set it directly since img src somehow doesn't get set from props until another action is issued*/}
					<div id="preview"> </div> 
					<img className="receipt-img" src={image.file.preview} />
					<button type="button" className="remove-comment"
						onClick={()=>removeImage(image.storageName)}
						>remove</button>
					<div>{image.storageName}</div>				
					</div>
				</td>
			</tr>
			)

	}
	
//);
}


export default Image;