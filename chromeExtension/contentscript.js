/*
* Copyright (c) 2013 Socialbit UG. All rights reserved.
* Thomas Kekeisen
*/

function setHeader(xhr)
{
	xhr.setRequestHeader('x-fs-token', 'YOUR TOKEN HERE');
}

// Set up a regex to identify a api page
var regex2 = /id="venueIcon"/;
var regex3 = /id="venueRecommendation"/;

// Test the text of the body element against our regular expression
if (regex2.test(document.body.innerHTML) || regex3.test(document.body.innerHTML))
{
    // Get the url meta
    var metaUrl = $('meta[property="og:url"]').attr('content');

    // Get the venue id
    var venueId = metaUrl.substr(metaUrl.lastIndexOf('/') + 1);

    // Get the valuation from landlord
    $.ajax
	({
		url: 'http://api.landlordgame.com:8080/assets/' + venueId + '/valuation?oauth_token=YOUR TOKEN HERE',
		beforeSend: setHeader,
		type: 'GET',
		dataType: 'json',
		success: function (data)
		{
			// Get the price of the venue on landlord
			var price = data.response.valuation.valuation;
			var money = data.response.balance;

			// Set up a new box
			$('<div></div>').addClass('box adminTools').attr('id', 'landlordBox')
				.append
				(
					$('<h5></h5>').html('Price on landlord: ' + price + '<br />Your money: ' + money)
				)
				.append
				(
					$('<a></a>').text('Buy now').click(function()
					{
						// Insert a iframe
						$('<div></div>').addClass('box').attr('id', 'landlordIFrame')
							.append
							(
								$('<iframe></iframe>').attr('src', 'http://api.landlordgame.com:8080/assets/' + venueId + '/buy?oauth_token=YOUR TOKEN HERE')
							)
							.insertAfter('#landlordBox');                
					})
				)
				.insertAfter('#venueRecommendation');
		}
	});
} 


// Set up a regex to identify a api page
var regex4 = /id="listPage"/;

// Test the text of the body element against our regular expression
if (regex4.test(document.body.innerHTML))
{
	// Set up the buy all button
	var addAll = $('<p></p>').append($('<a></a>').text('Buy all').click(function()
	{
		$('.s-list-item-wrapper').each(function(i, element)
		{
			// Get the element
			var element = $(element);

			// Get the title link
			var titleLink = element.find('h3 a').attr('href');

    		// Get the venue id
    		var venueId = titleLink.substr(titleLink.lastIndexOf('/') + 1);
    
    		// Add the iframe
    		element.find('.s-list-item')
    			.append
				(
					$('<iframe></iframe>').attr('src', 'http://api.landlordgame.com:8080/assets/' + venueId + '/buy?oauth_token=YOUR TOKEN HERE')
				);
		});	
	}));

	// Add the buy all button
	addAll.insertAfter('#listDetails h1');

		$('.s-list-item-wrapper').each(function(i, element)
		{
			var element = $(element);
    
    		// Add the iframe
    		element.find('.s-list-item')
    			.append
				(
					$('<a></a>').text('Buy').click(function()
					{
						var clicked = $(this);
						
									// Get the title link
			var titleLink = clicked.parent().find('h3 a').attr('href');

    		// Get the venue id
    		var venueId = titleLink.substr(titleLink.lastIndexOf('/') + 1);
						
						clicked.parent()
    						.append
							(				
								$('<iframe></iframe>').attr('src', 'http://api.landlordgame.com:8080/assets/' + venueId + '/buy?oauth_token=YOUR TOKEN HERE')
							);
					})
				);
		});	









}