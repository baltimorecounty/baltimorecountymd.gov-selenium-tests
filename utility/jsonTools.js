/**
 * Extracts a subtree of a json document based on a property match.
 */
const getSubtree = function(jsonData, matchPropertyName, subtreePropertyName, searchValue) {
	var match;
	$.each(jsonData, function(idx, item) {
		if (item[subtreePropertyName]) {
			if (item[matchPropertyName] === searchValue) {
				match = item[subtreePropertyName];   
				return false;                    
			} else {
				match = getSubtree(item[subtreePropertyName], searchValue);
			}
		}
	});
	return match;
},

getSubtreePath = function(data, matchProperty, subtreeProperty, searchValue) {
	for (let x = 0; x < data.length; x++) {
		if (data[x][matchProperty] == searchValue) {
			return data[x][matchProperty];
		}
		if (data[x][subtreeProperty] && getSubtreePath(data[x][subtreeProperty], 'id', 'types', searchValue))
			return [data[x][matchProperty], getSubtreePath(data[x][subtreeProperty], 'id', 'types', searchValue)];
	}
};

module.exports = { getSubtree,  getSubtreePath };