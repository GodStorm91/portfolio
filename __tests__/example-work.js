import React from 'react';
import {shallow} from 'enzyme';
import ExampleWork from '../js/example-work';
import { ExampleWorkBubble } from '../js/example-work';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()})

const myWork = [
	{
		'title' : "AskVietnamese",
		'image': {
			'desc': "A Website for foreigners to ask local Vietnamese",
			'src': "images/askvietnamese.png",
			'comment': ""
		},
		'link': "https://askvietnamese.vn/home"
	},
	{
		'title' : "Nech",
		'image': {
			'desc': "A blog for engineer",
			'src': "images/example2.png",
			'comment': ""
		},
		'link' : "https://nech.info"
	}
]

describe("ExampleWorkBubble component", () => {
	let component = shallow(<ExampleWorkBubble example={myWork[0]}/>);
	let images = component.find('img');

	it("should contain a single image", () => {
		expect(images.length).toEqual(1);
	})

	it("should contain image src set correctly", () => {
		expect(images.prop('src')).toEqual(myWork[0].image.src);
	})
})


describe('ExampleWork component', () => {
	let component = shallow(<ExampleWork work={myWork}/>);

	it('should be a section element', () => {
		expect(component.type()).toEqual("section");
	})

	it('should contains as many children as the input buble', () => {
		expect(component.find('ExampleWorkBubble').length).toEqual(myWork.length);
	})

})

