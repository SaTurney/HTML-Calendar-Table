"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: Sabrina Turney
   Date:   09/24/2019
   Filename:   lht_calendar.js  
	
    
    Creating a Calendar for the Upcoming Events at the Lyman Hall Theater.
    
    Function List:
    createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

    calCaption(calDate)
      Writes the caption of the calendar table

    calWeekdayRow()
      Writes the weekday title rows in the calendar table

    daysInMonth(calDate)
      Returns the number of days in the month from calDate

    calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate

*/


//Set the date to use for our calendar
var thisDay = new Date();


// grab element id "calendar" and attach our calendar we're making to it.
document.getElementById("calendar").innerHTML = makeCal(thisDay);


// This function "creates" the calendar, which is just a glorified table. 
function makeCal(calDate) {
	var calendarHTML = "<table id='calendar_table'>";
    //We give it a name and easy to remember id name.
    
	calendarHTML += calCaption(calDate);
	calendarHTML += calWeekRows();
	calendarHTML += calDays(calDate);
	calendarHTML += "</table>";
    //Then we attach all these functions to it, which are expanded on below,
    //but essentially, we attach the month, year, create the correct number of
    //rows and columns as well as attach dates.
    //Last but not least, the end table tag!
	return calendarHTML;
}


//Here we start working on the guts of the calendar- We add the months and figure
//out what year we're living in (I honestly forget sometimes)
function calCaption(calDate) {
	
    //We create an array variable with all months first.
	var monthName = ["January", "February", "March", 
		"April", "May", "June", "July", "August", 
		"September", "October", "November", "December"];
	
    // Then we find out which month we're livng in.
	var currentMonth = calDate.getMonth();
    
	// And again but with the year this time!
	var currentYear = calDate.getFullYear();
	
    // Here we're just returning that information for the end user.
	return "<caption>" + monthName[currentMonth] + " " + currentYear + "</caption>";
}



//The purpose of this function is now to attach Sunday through saturday to the table
//of the calendar we made! Fancy!
function calWeekRows() {
	
    // create an array variable for the days of the week:
	var dayName = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
	var rowHTML = "<tr>";

    //use a "for" loop to attach them all onto the table row.
	for (var i = 0; i < dayName.length; ++i) {
		rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
	}
	rowHTML += "</tr>";
    //This function just returns a simple end to the table row.
	return rowHTML;
}


//First we figure out how many days in the month we are using:
function daysOfMonth(calDate) {
	var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
    
    
	// create variables for the current calendar year and month:
	var thisYear = calDate.getFullYear();
	var thisMonth = calDate.getMonth();
    
	//Special case for February- Get to use the modulus operator!
	if (thisYear % 4 === 0) {
		if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
			dayCount[1] = 29;
		}
	}
	//This function now returns a count of the number of days in the month chosen (the current one).
	return dayCount[thisMonth];
}



// Now we create the rows of the table depending on the months and days of 
//the selected month.
function calDays(calDate) {
	
    //First we have to determine which day of the week the month begins on
    //It's not always a sunday!
	var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
	var weekDay = day.getDay();
    
	// blank cells go here for empty days (for example, the month begins on 
    //a wednesday or something similar.)
	var htmlCode = "<tr>";
	for (var i = 0; i < weekDay; ++i) {
		htmlCode += "<td></td>";
	}
	var totalDays = daysOfMonth(calDate);
	
    //Here is where the user can see what day it actually is by the "highlight" on today's date (whatever that may be).
    var today = calDate.getDate();
	for (var i = 1; i <= totalDays; ++i) {
		day.setDate(i);
		weekDay = day.getDay();
		if (weekDay === 0) htmlCode += "<tr>";
		if (i === today) {
			htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";
		} else {
			htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
		}
		if (weekDay === 6) htmlCode += "</tr>";
	}
	return htmlCode;
}