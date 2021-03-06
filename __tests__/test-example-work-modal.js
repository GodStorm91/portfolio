import React from 'react';

import { shallow } from 'enzyme';

import ExampleWorkModal from '../js/ExampleWorkModal';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()})

const myExample = {
		'title' : "AskVietnamese",
		'image': {
			'desc': "A Website for foreigners to ask local Vietnamese",
			'src': "images/askvietnamese.png",
			'comment': ""
		},
		'link': "https://askvietnamese.vn/home"
	};

describe('ExampleWorkModal component', () =>{
	let component = shallow(<ExampleWorkModal example={myExample} open={false}/>);
	let openComponent = shallow(<ExampleWorkModal example={myExample} open={true}/>);

	let anchors = component.find('a');

	it("Should contains a single anchor tag", () => {
		expect(anchors.length).toEqual(1);
	})

	it("Should contains link to our project", () => {
		expect(anchors.prop('href')).toEqual(myExample.link);
	})

	it("Should have the modal class set correctly", () => {
		expect(component.find('.background--skyBlue').hasClass("modal--closed")).toBe(true);
		expect(openComponent.find('.background--skyBlue').hasClass("modal--open")).toBe(true);
	})

})