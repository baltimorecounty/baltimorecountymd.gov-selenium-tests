const chakram = require('chakram'),
	expect = chakram.expect,
	serviceUrl = 'http://localhost:1000/api/playlistgallery/PLE007697EAB31BACC';

describe("YouTube Playlist", () => {

	it("should return a playlist",  () => {

		var response = chakram.get(serviceUrl);

		expect(response).to.have.status(200);

		return chakram.wait();

	});

}); 	