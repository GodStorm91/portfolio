import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work';

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
	},
	{
		'title' : "Just a cat",
		'image': {
			'desc': "Just a cat picture",
			'src': "images/example3.png",
			'comment': ""
		},
		'link': 'https://google.com'
	}

]

ReactDOM.render(<ExampleWork work={myWork} />, document.getElementById('example-work'));