$(document).ready(function(){

	//input box element
    var fbInput = $("#number-entry");

    //Submit button element
    var subButton = $("#submit-btn");

    //table container
    var container = $("#foobar-container");
  
    //Alert Box
    var alert = $("div#alertBox.alert");
  
    //Alert close button
    var closeX = $("button.alert-close");

    //html to set up the table
    var DefaultTableInterface = "<table>\
						                            <thead>\
						                              <tr>\
						                                <th class='position-column'>Position</th>\
						                                <th>FooBar List</th>\
						                              <tr/>\
						                            </thead>\
						                            <tbody>\
						                            </tbody>\
						                        </table>";

//**Functions to test if the number is divisible by 3, 5, or both***********
    function div_by_3(num) {
    	return num % 3;
    }

    function div_by_5(num) {
    	return num % 5;
    }

    function div_by_3_and_5(num) {
    	return num % 15;
    }
//************************************************************

    //Submit button event handler
    subButton.on("click", function() {

	    //clear any previous results to make way for new result
	    container.empty();

	    //get number from the input box
	    var listNumber = fbInput.val();
	     
	    if (listNumber === "0" || listNumber === "" || isNaN(listNumber)) { //if there is no number or it is zero, clear the container and input
	    	container.empty();
	        fbInput.val("");
	        $(this).blur();

	        //show alert message to warn of incorrect entry
	        alert.show();

	    } else {	
	    	//if there is a number, attach the table to the container and add the result rows to it

	    	//remove focus from the Submit button
	        $(this).blur();

	        //append the table to the container
	        container.append(DefaultTableInterface);

	        var listRows = "";
	        for (var n = 1; n <= listNumber; n++) {	//for every number up to and including the input number

	        	//call the functions to check what the number can be divided by to determine the result
	          	var result = div_by_3_and_5(n) === 0 ?  "FooBar" : div_by_3(n) === 0 ? "Foo" : div_by_5(n) === 0 ? "Bar" : n;

	          	//set css class based on result
	          	var highlight;
	          	if (result === n) {
	            	highlight = "no-highlight";
	          	} else if (result === "FooBar") {
	           		highlight = "foobar";
	          	} else if (result === "Foo") {
	            	highlight = "foo";
	          	} else {
	            	highlight = "bar";
	          	}

	          	//create html for the table row with class, position and result
	         	listRows += "<tr class='" + highlight + "'>";
	          	listRows += 		"<td class='position-column'>" + n + "</td>";
	          	listRows += 		"<td>" + result + "</td>";
	          	listRows += "</tr>";
	        }

	        //add the result rows to the table
	        container.find("tbody").append(listRows);
	    }
    });
  
  	//close the alert when OK button is clicked
  	closeX.on("click", function() {
    	alert.hide();
  	});
  
  	// When the user clicks anywhere outside of the alert, close it
  	$(document).on("click", function(event) {
    	if (event.target == alert[0]) {
      		alert.hide();
    	}
  	});

  	//handle if the enter key is used instead of clicking
	fbInput.on("keyup", function(e) {
		if (e.which === 13) {
			e.preventDefault();
			subButton.trigger("click");
		}

		//if after any other keyup the input is blank, empty the container
    	if (fbInput.val() === "") {
      		container.empty();
    	}
	});
});