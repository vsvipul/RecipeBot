const FACEBOOK_ACCESS_TOKEN = 'EAADG5fKLZBWIBAIUOKXZAwSOe93qzzSnFSwLxwBKH52mYfpbu3zGLqGb8dUsMJku4dRWXtfSg0vHiGZB1V402CVznD3rF0TOZAePk5Vik0RF8VcQKWAZCu3CCkHXxZAxzBHVjCXhy5UDpwKMjPiFJcGkqWzeOyW57sETrPZBN6HggZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id: senderId },
			message: { text },
		}
	});
};
var cheerio = require('cheerio');

let time, ingredients = [], steps = [];
var count = 0;

const scrapeDishes = (name, senderId) => {
	let dishes = [];
	const getDishes = new Promise( resolve => {
		request('https://www.allrecipes.com/search/results/?wt=' + name + '&sort=re', function (error, response, html) {
	  		if (!error && response.statusCode == 200) {
			    var $ = cheerio.load(html);
				$('span.fixed-recipe-card__title-link').each(function(i, element){
				  if(i==1) return false;
				  var a = $(this).prev();
				  dishes.push( {
					  name: element.children[0].data,
					  url: element.parent.attribs.href
				  });
				  scrapeRecipe(element.parent.attribs.href, senderId);
			    });
				resolve();
			}
		});
	});
	return Promise.all([getDishes]).then(() => {
		return dishes;
	});
}

const scrapeRecipe = (url, senderId) => {
	request(url, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
		let message = "";
		$('span.recipe-ingred_txt[itemprop]').each(function(i, element){
	      var a = $(this).prev();
	      // console.log(element.children[0].data);
		  // console.log($(this).text());
		  message += "* " + $(this).text() + '\n';
		  ingredients.push($(this).text());
	    });
		sendTextMessage(senderId, message);
		setTimeout(function(){
			$('span.ready-in-time').each(function(i, element){
		      var a = $(this).prev();
		      // console.log(element.children[0].data);
			  time = ($(this).text());
			  // console.log($(this).text());
		    });
			sendTextMessage(senderId, "The time taken for this recipe will be around " + time);
			sendTextMessage(senderId, "Are you ready to cook this recipe?");
		},2000);
		$('span.recipe-directions__list--item').each(function(i, element){
	      var a = $(this).prev();
	      // console.log(element.children[0].data);
		  // console.log($(this).text());
		  steps.push($(this).text());
		});
	  }
	  console.log(steps, "sad");
	});
}

const showRecipe = (senderId) =>{
	if (count == steps.length){
		count = 0;
		steps = [];
		ingredients = [];
		sendTextMessage(senderId, "What are you saying yes about? :D");
		return;
	}
	sendTextMessage(senderId, String(steps[count++]).trim());
	if (count != steps.size){
		setTimeout(function(){
			sendTextMessage(senderId, "Are you ready for the next step?");
		},10000);
	};
	if (count == steps.length){
		count = 0;
		steps = [];
		ingredients = [];
		sendTextMessage(senderId, "That was the last step!");
	}
}

const fromIngredients = (senderId, ingredients) => {
	let dishes = [];
	let dishes_output = "";
	let ing = "";
	for (var i = 0; i < ingredients.length-1; i++) {
		ing+=ingredients[i] + ",";
	}
	ing+=ingredients[ingredients.length-1];
	const getDishes = new Promise( resolve => {
		request('https://www.allrecipes.com/search/results/?ingIncl=' + ing + '&sort=re', function (error, response, html) {
	  		if (!error && response.statusCode == 200) {
			    var $ = cheerio.load(html);
				$('span.fixed-recipe-card__title-link').each(function(i, element){
					if(i==5) return false;
				  var a = $(this).prev();
				  dishes.push( {
					  name: element.children[0].data,
					  url: element.parent.attribs.href
				  });
				  dishes_output+="* " + element.children[0].data + "\n";
				  // scrapeRecipe(element.parent.attribs.href, senderId);
			    });
				resolve();
			}
		});
	});
	Promise.all([getDishes]).then(() => {
		sendTextMessage(senderId, dishes_output);
	});

}

module.exports = {
	scrapeDishes, scrapeRecipe, showRecipe, fromIngredients
}
