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
	let mockOpenModalFn = jest.fn();

	let component = shallow(<ExampleWorkBubble example={myWork[0]} openModal={mockOpenModalFn}/>);
	let images = component.find('img');

	it("should contain a single image", () => {
		expect(images.length).toEqual(1);
	})

	it("should contain image src set correctly", () => {
		expect(images.prop('src')).toEqual(myWork[0].image.src);
	})
	it("Should call lthe open handler on click ", () => {
		component.find(".section__exampleWrapper").simulate('click');
		expect(mockOpenModalFn).toHaveBeenCalled();
	})
})


describe('ExampleWork component', () => {
	let component = shallow(<ExampleWork work={myWork}/>);

	it('should be a span element', () => {
		expect(component.type()).toEqual("span");
	})

	it('should contains as many children as the input buble', () => {
		expect(component.find('ExampleWorkBubble').length).toEqual(myWork.length);
	})

	it("Should allow the modal to open and close", () => {
		component.instance().openModal();
		expect(component.instance().state.modalOpen).toBe(true);
		component.instance().closeModal();
		expect(component.instance().state.modalOpen).toBe(false);
	})

})

