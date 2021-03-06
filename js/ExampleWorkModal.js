import React from 'react';

class ExampleWorkModal extends React.Component {
	render() {
	let modalClass = this.props.open ? 'modal--open' : 'modal--closed';
	let example = this.props.example;
		return (
		    <div className={"background--skyBlue " +  modalClass}>
		      <span className="color--cloud modal__closeButton"
		      onClick={this.props.closeModal}>
		        <i className="fa fa-window-close-o"></i>
		      </span>
		      <img alt={example.image.desc}
		           className="modal__image"
		           src={example.image.src}/>
		      <div className="color--cloud modal__text">
		        <h2 className="modal__title">
		          { example.title }
		        </h2>
		        <a className="color--skyBlue modal__link"
		           href={example.link}>
		          Check it out
		        </a>
		        <p className="modal__description">
		          {example.desc}
		        </p>
		      </div>
		    </div>
		)

	};
};

export default ExampleWorkModal;