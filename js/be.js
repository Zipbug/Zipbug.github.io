(function() {
  
	//Generate a unique-ish cb handler
	var cb = "bh";
	for(var i=0; i<20; i++) {
		cb += Math.floor(Math.random()*10);	
	}

	//Display results
	window[cb] = function(e) {
		if(!window.BEHANCE_DOM) var d = document.querySelector("#behance");
		else var d = document.querySelector(window.BEHANCE_DOM);
		
		if(e.responseStatus === 200) {
			var title = e.responseData.feed.title;

			title = '<a href="http://be.net/' + BEHANCE_USER + '"><img src="http://assets.behance.net/img/portfolio/badges/badges/be-badge-small.png"></a>' + title;

			var link = e.responseData.feed.link;
			var body = "";
			for(var i=0; i<e.responseData.feed.entries.length; i++) {
				var entry = e.responseData.feed.entries[i];
				//Remove the inline style
				var content = entry.content.replace(/style=".*?"/, "");
				//preprend a link
				content = content.replace(/>/,"></a>");
				content = "<a href='" + entry.link + "'>" + content;
				console.log(content);
				body += "<div class='behance_entry'><a href='" + entry.link + "' class='titleLink'>" + entry.title + "</a><br/><p>" + content + "</p></div>";
			}

			var result = "<div class='behance_main'><div class='behance_title'>"+title+"</div>";
				result += "<div class='behance_entries'>" + body + "</div></div>";
			d.innerHTML = result;
			
		} else {
			//handle error
			d.innerHTML = "<div class='behance_main'><p>Sorry, we couldn't load the Behance feed.</p></div>";
		}
	}

	if(!BEHANCE_USER) return;


	var url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A//www.behance.net/" + BEHANCE_USER + ".xml&num=10&v=1.0&callback="+cb;

	
	var script = document.createElement("script");
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
	
	//append CSS
	//credit the second comment: http://stackoverflow.com/questions/707565/how-do-you-add-css-with-javascript
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "div.behance_entry { clear:both; } div.behance_main { border-style:solid; border-width:thin; width: 250px; } div.behance_entry { padding-bottom: 10px; } div.behance_title { margin-left: auto; margin-right: auto; width: 100%; font-weight: bold; text-align: center; background-color: black; color: white; padding-top: 5px; padding-bottom: 5px; } div.behance_entry a.titleLink {display:block; text-align: center; margin-bottom: -25px; } div.behance_entry img { display: block; margin-left: auto; margin-right: auto; margin-bottom: -10px; } div.behance_entry p { margin-left: auto; margin-right: auto; display:block; width: 202px; } div.behance_main a { text-decoration: none; font-weight: bold;} div.behance_main { font-size: 0.8em; font-family: Arial; }  div.behance_title img { margin-top: auto; margin-bottom: auto; margin-left: 10px; float: left; }";
	document.body.appendChild(css);
	
}());