const frisby = require('frisby'),
	serviceUrl = 'http://localhost:1000/api/playlistgallery/PLE007697EAB31BACC';

frisby.create('Get YouTube Playlist')
	.get(serviceUrl)
	.expectStatus(200)
	.toss();

frisby.create('Get YouTube Playlist Count')
	.get(serviceUrl)
	.expectStatus(200)
	.expectJSONTypes('', {
		pageInfo: {
			totalResults: Number,
			resultsPerPage: Number
		}
	})
	.toss();	