function setHeader(xhr)
{
	xhr.setRequestHeader('x-fs-token', 'YOUR TOKEN HERE');
}

$(document).ready(function()
{
    // Get the valuation from landlord
    $.ajax
	({
		url: 'http://api.landlordgame.com:8080/players/self/portfolio?oauth_token=YOUR TOKEN HERE',
		beforeSend: setHeader,
		type: 'GET',
		dataType: 'json',
		success: function (data)
		{
			// Get the table
			var table = $('table tbody');
		
			// Get the buildings
			var buildings = data['response']['properties'];
		
			// Iterate the data
			for (var i in buildings)
			{
				// Get the building
				var building = buildings[i];
			
				// Add the entry
				table.append
				(
					$('<tr></tr>')
						.append($('<td></td>').text(building['foursquare']['name']))
						.append($('<td></td>').text(building['details']['totalRent'] - building['details']['totalCosts']))
						.append($('<td></td>').text(building['details']['totalRent']))
						.append($('<td></td>').text(building['details']['totalCosts']))
				);
			}
			
			// Enable sorting
			$('table').tablesorter();
		
			// Hide the loading stuff
			$('#loading').hide();
			$('#data').show();
		}
	});
});