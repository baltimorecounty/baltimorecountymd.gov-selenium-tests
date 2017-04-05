const frisby = require('frisby'),
	serviceUrl = 'http://localhost:1000/api/docket';

frisby.create('Get Docket Info')
	.get(serviceUrl)
	.expectStatus(200)
	.expectBodyContains('HEADER')
	.toss();
