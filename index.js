// Name: _your name here_
// Date: _add date here_
// Section: CSE 154 _your section here_
//
// -- your description of what this file does here --
//

(function() {
  "use strict";

  // MODULE GLOBAL VARIABLES, CONSTANTS, AND HELPER FUNCTIONS CAN BE PLACED
  // HERE

  // An array of quotes where the first index is the source game, and second index is the quote.
  let quotes = [

    ["Crazy Taxi", "Hey hey hey it’s time to make some carrrrazzzyyy money are ya ready? Here we go! - Taxi Driver"],
    ["Half-Life 2", "The right man in the wrong place can make all the difference in the world. - G-Man"],
    ["Borderlands 2", "Nothing is more badass than treating a woman with respect. – Mr. Torgue"],
    ["The Legend Of Zelda", "It's dangerous to go alone! Take this. - Old Man in the Cave"],
    ["Saints Row IV", "Tell my wife, I had another wife. - Dying Secret Service Man"],
    ["Bioshock", "We all make choices in life, but in the end the choices make us. - Andrew Ryan"],
    ["The Elder Scrolls V: Skyrim", "Which is better? To be born good or to overcome your evil nature through great effort? - Paarthurnax"],
    ["Mass Effect 3", "Stand in the ashes of a trillion dead souls, and ask the ghosts if honor matters. The silence is your answer. - Javik"],
    ["Assassin's Creed 2", "Wanting something does not give you the right to have it. - Ezio Auditore"],
    ["Metro 2033", "Even in dark times, we cannot relinquish the things that make us human. - Khan"],
    ["Call of Duty: Modern Warfare 2", "The healthy human mind doesn't wake up in the morning thinking this is its last day on Earth. But I think that's a luxury, not a curse. To know you're close to the end is a kind of freedom. Good time to take... inventory. - Captain Price"],
    ["Dishonored", "It’s a funny thing, ambition. It can take one to sublime heights or harrowing depths. And sometimes they are one and the same. - Emily Kaldwin"],
    ["Halo", "A hero need not speak. When he is gone, the world will speak for him."],
    ["Bioshock", "No gods or kings. Only man. - Andrew Ryan"],
    ["Red Dead Redemption", "Some trees flourish, others die. Some cattle grow strong, others are taken by wolves. Some men are born rich enough and dumb enough to enjoy their lives. Ain’t nothing fair. - John Marston"],
    ["Far Cry 2", "You can’t break a man the way you break a dog, or a horse. The harder you beat a man, the taller he stands."],
    ["Duke Nukem 3D", "It's time to kick ass and chew bubblegum... and I'm all outta gum. - Duke Nukem"],
    ["Alan Wake", "If our lives are already written, it would take a courageous man to change the script. - Alan Wake"],
    ["Pac-Man", "Wakka wakka wakka. - Pac-Man"],
    ["Fallout", "War, war never changes. - Narrator"],
    ["Super Mario Bros", "Thank You Mario! But our princess is in another castle! - Toad"],
    ["Mortal Kombat", "Get over here! - Scorpion"],
    ["Dark Souls 3", "I may be but small, but I will die a colossus. - Ludleth of Courland"],
    ["Dark Souls Series", "AAAAAAAARRRRGGGHH! - Protagonist Dying"]

  ];

  let titles = ["Commander", "Hero", "Combatant", "Witcher", "Builder", "Chosen One", "Infected", "Templar", "Warden", "Guardian", "Dovahkiin",
  "Chosen Undead", "Dreamer", "Outlaw", "Shepard", "Trainer"];

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  window.addEventListener("load", initialize);

  /**
   *  CHANGE: Describe what your initialize function does here.
   */
  function initialize() {
  	// Sets the time and the weekday
    startTime();
    $("weekday").innerText = getDayOfWeek();

    // Retrieve and display random quote
    let quote = getRandomFromArray(quotes);
    $("game").innerText = quote[0];
    $("quote").innerText = quote[1];

    // Retrieve and display random title
    let title = getRandomFromArray(titles);
    $("title").innerText = "Welcome back, " + title;

    // Retrieve and display random background image
    //console.log("url(backgrounds/" (Math.floor(Math.random()) * 7) + 1 + ".png)");
    document.body.style.backgroundImage = "url('backgrounds/" + (Math.round(Math.random() * 6)) + ".png')";

    getLocation();
  }

  function getRandomFromArray(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let symbol = "AM";

    if (h >= 12) {
      symbol = "PM";
    }

    h = formatHours(h);
    m = checkTime(m);
    s = checkTime(s);
    $("time").innerText = h + ":" + m + ":" + s + " " + symbol;
    setTimeout(startTime, 500);
  }

  // Adds a "0" in front of nubmers less than 10.
  function checkTime(x) {
    if (x < 10) {
      x = "0" + x
    }
    return x;
  }

  function formatHours(h) {
    if (h > 12) {
      h = h - 12;
    }
    return h;
  }

  function getLocation() {
  	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(showWeather, getLocationError);
  	} else {
  		$("weather_feedback").innerText = "Geolocation is not supported by this browser."
  	}
  }

  function showWeather(position) {
  	let lat = position.coords.latitude;
  	let lng = position.coords.longitude;

  	fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + lat + "&lon=" + lng)
  		.then(checkStatus)
  		.then(JSON.parse)
  		.then(function(response) {
  			let city = response.address.city;
  			postscribe("#weather", "<script type='text/javascript' src='https://darksky.net/widget/default/" + lat + "," + lng + "/us12/en.js?width=100%&height=250&title=" + "Local Weather In " + city + "&textColor=ffffff&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Sans-Serif&customFont=&units=us&htColor=ffffff&ltColor=ffffff&displaySum=yes&displayHeader=yes'></script>");
  		})
  		.catch(console.log);

  	

  }

  function getLocationError(err) {
  	if(err.code == 1) {
    	$("weather_feedback").innerText = "Error: Access is denied!";
  	} else if( err.code == 2) {
   		$("weather_feedback").innerText = "Error: Position is unavailable!";
    }  				
  }

  function getDayOfWeek() {
  	let today = new Date();
  	return weekdays[today.getDay()];
  }
  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

	/*
	 * Helper function to return the response's result text if successful, otherwise
	 * returns the rejected Promise result with an error status and corresponding text
	 * @param {object} response - response to check for success/error
	 * @returns {object} - valid result text if response was successful, otherwise rejected
	 *                     Promise result
	 */
	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300 || response.status == 0) {
			return response.text();
		} else {
			return Promise.reject(new Error(response.status + ": " + response.statusText));
		}
	}

})();
