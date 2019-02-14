## RecipeBot
A recipe bot created during Jio Inter IIT TechMeet 2018 at IIT Bombay. 

## Problem Solution
The bot aims to bridge the gap between delicious and lavish dishes and people not having the fancy ingredients to make them. It also helps people to make use of their leftover ingredients and cook good meals out of it. This bot helps you search for recipes using recipe name or by ingredients. Its ability to suggest cheaper and alternative ingredients would be a boon to a large mass of middle class Indians. 
It is also designed to suggest dishes and recipies for different occasions of India related recipes. 

## Technologies Used

- NodeJS
- Cheerio
- DialogFlow
- FB Messenger for Developers

### How to run

1.  Clone this repo.  
2.  Setup a proxy server with ngrok and set the port number to be the same as the one defined in Node. It is 3000 by default.
3. 	Run the ngrok server.
4. 	Setup the respective app on FB developers account using the Forwarding URL obtained in previous step and the token you entered in 'controllers/verification.js'.
5.	Insert your API Keys for FB Developers and DialogFlow into the file 'helpers/processMessage.js'.
6. 	Apply the required integrations on DialogFlow.
7.  Run index.js. If all is well with your bot, you should get replies from the bot in Messenger for some simple questions.
8. 	For any help related to setup, refer to the tutorial [here](https://medium.com/crowdbotics/how-to-create-your-very-own-facebook-messenger-bot-with-dialogflow-and-node-js-in-just-one-day-f5f2f5792be5).

## What can it do?
RecipeBot can do a variety of things related to recipes. Some of them are-
-	Lookup recipes for you and provide them to you stepwise.
-	List dishes you can make with the ingredients you have.
-	Lookup for alternate ingredients that you may use in case some ingredients are not available.
-	Alert dishes according to a particular festival or occasion.

## How to contribute?
Clone the repo and feel free to send any Pull Requests that you feel to be contructive.
