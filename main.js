var data = {
	"title": "Store (BA) Hours",
	"open-message": "OPEN",
	"closed-message": "CLOSED",
	"optional-message": "All Pinarello are 50% next week! ;-)",
	"hours": [
		{
			"day": "Monday",
			"open": 14,
			"close": 19
		},
		{
			"day": "Tuesday",
			"open": 14,
			"close": 19
		},
		{
			"day": "Wednesday",
			"open": 14,
			"close": 19
		},
		{
			"day": "Thursday",
			"open": 14,
			"close": 19
		},
		{
			"day": "Friday",
			"open": 14,
			"close": 19
		},
		{
			"day": "Saturday",
			"open": 13,
			"close": 16
		},
		{
			"day": "Sunday",
			"open": 0,
			"close": 0
		},
	],
	"color-scheme": "automatic"
};

// ---------------------------------------------------------

// function loadJSON(filePath) {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open("GET", filePath, false);
//   if (xmlhttp.overrideMimeType) {
//     xmlhttp.overrideMimeType("application/json");
//   }
//   xmlhttp.send();
//   if (xmlhttp.status==200) {
//     return xmlhttp.responseText;
//   } else {
//     return null;
//   }
//   return JSON.parse(json);
// }
//
// var json = loadJSON("http://localhost:8000/hours.json");

var date = new Date();

function storeIsOpen() {
  var hour = date.getHours();
  console.log("Hour", hour);
  var day = date.getDay();
  var hours = data["hours"];
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

document.getElementById("title").innerHTML = "<h3>" + data["title"] + "</h3>";
var stat = storeIsOpen() ? data["open-message"] : data["closed-message"];
document.getElementById("status").innerHTML = "<h1>" + stat + "</h1>";
var opt = data["optional-message"];
if (opt && opt.length) {
	document.getElementById("message").innerHTML = "<i>" + opt + "</i>";
}
document.getElementById("footer").innerHTML = date.toLocaleString();

document.write("<table border==\"1\"><tr>");
var hours = data["hours"];
for (var i = 0, end = hours.length; i < end; i++) {
	document.write('<tr>');
	if (0 != hours[i]["open"] && 0 != hours[i]["close"]) {
		document.write('<td><b>' + hours[i]["day"] + '</b></td>');
  		document.write('<td><b>' + formatHour(hours[i]["open"]) + '</b></td>');
  		document.write('<td><b>' + formatHour(hours[i]["close"]) + '</b></td>');
	} else {
		document.write('<td>' + hours[i]["day"] + '</td>');
  		document.write("<td>—</td>");
  		document.write("<td>—</td>");
	}
	document.write('</tr>');
}
document.write("</table>");
