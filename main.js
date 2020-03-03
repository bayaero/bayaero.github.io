var url = "https://raw.githubusercontent.com/bayaero/bayaero.github.io/master/hours.json";

function isStoreOpen(date, hours) {
  	var day = date.getDay();
  	var hour = date.getHours();
  	for (var ind in hours) {
    	var d = hours[ind];
		if (d["day"] == day) {
      	  return (0 != d["open"] && 0 != d["close"] && hour >= data["open"] && hour < data["close"]);
		}
  	}
}

function formatHour(hour) {
	if (hour > 12) {
		return hour - 12 + "p";
	} else if (hour == 12) {
		return hour + "p";
	} else {
		return hour + "a";
	}
}

function buildPage(data) {
	var date = new Date();
  	var hours = data["hours"];
	var stat = isStoreOpen(date, hours) ? data["open-message"] : data["closed-message"];
	var opt = data["optional-message"];
	document.getElementById("title").innerHTML = "<h3>" + data["title"] + "</h3>";
	document.getElementById("status").innerHTML = "<h1>" + stat + "</h1>";
	if (opt && opt.length) {
		document.getElementById("message").innerHTML = "<i>" + opt + "</i>";
	}
	document.getElementById("footer").innerHTML = date.toLocaleString();
	
	var table = "<table border==\"1\"><tr>";
	for (var i = 0, end = hours.length; i < end; i++) {
		table += "<tr>";
		if (0 != hours[i]["open"] && 0 != hours[i]["close"]) {
			table += "<td><b>" + hours[i]["day"] + "</b></td>";
	  		table += "<td><b>" + formatHour(hours[i]["open"]) + "</b></td>";
	  		table += "<td><b>" + formatHour(hours[i]["close"]) + "</b></td>";
		} else {
			table += "<td>" + hours[i]["day"] + "</td>";
	  		table += "<td>—</td>";
	  		table += "<td>—</td>";
		}
		table += "</tr>";
	}
	table += "</table>";
	document.getElementById("hours").innerHTML = table;
}

function fetchAndBuildPage() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var data = JSON.parse(this.responseText);
	        buildPage(data);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

fetchAndBuildPage();
