const frisby = require('frisby'),
	serviceUrl = 'http://localhost:1000/api/libraryfeed';

frisby.create('Get Between The Covers Blog Feed')
	.get(serviceUrl)
	.expectStatus(200)
	.toss();

frisby.create('Get Adult Fiction Blog Feed')
	.get(serviceUrl + '/199')
	.expectStatus(200)
	.toss();

frisby.create('Get Adult Non-Fiction Blog Feed')
	.get(serviceUrl + '/200')
	.expectStatus(200)
	.toss();

frisby.create('Get Teen Books Blog Feed')
	.get(serviceUrl + '/188')
	.expectStatus(200)
	.toss();

frisby.create('Get Children\'s Books Blog Feed')
	.get(serviceUrl + '/191')
	.expectStatus(200)
	.toss();
