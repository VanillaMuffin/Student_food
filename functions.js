function changeSelection() {
    var limit = document.getElementById("rangeInput").value;
    document.getElementById("textInput").value = limit;

    for (var i = 0; i < restaurantMarkers.length; i++) {
        if (parseFloat(restaurantMarkers[i].doplacilo) >= limit) {

            restaurantMarkers[i].setMap(null);
        } else {
            console.log(restaurantMarkers[i].doplacilo);
        }
    }
}



function pinLeft() {
    var panelSize = document.getElementById("panelLeft").clientWidth;

    if (pinned) {
        document.getElementById("panelLeft").style.width = "0px";
        document.getElementById("settings").style.display = "none";
        document.getElementById("dataContainer").style.visibility = "hidden";
        document.getElementById("dataContainer").style.opacity = "0";

        var elements = document.getElementsByClassName("myRange");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.visibility = "hidden";
            elements[i].style.opacity = "0";
        }
        pinned = false;
        document.getElementById("more").disabled = true; 
        document.getElementById("path").disabled = true; 

    } else {
        document.getElementById("panelLeft").style.width = "270px";
        document.getElementById("settings").style.display = "block";
        document.getElementById("dataContainer").style.visibility = "visible";
        document.getElementById("dataContainer").style.opacity = "1";
        var elements = document.getElementsByClassName("myRange");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.visibility = "visible";
            elements[i].style.opacity = "1";
        }
        pinned = true;
        document.getElementById("more").disabled = false; 
        document.getElementById("path").disabled = false;
    }
}
//when click on pinhead

function unpin() {
    var panelSize = document.getElementById("panelLeft").clientWidth;
    if (panelSize == "0") {
        document.getElementById("panelLeft").style.width = "270px";
        document.getElementById("settings").style.display = "block";
        document.getElementById("dataContainer").style.visibility = "visible";
        document.getElementById("dataContainer").style.opacity = "1";
        var elements = document.getElementsByClassName("myRange");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.visibility = "visible";
            elements[i].style.opacity = "1";
        }
        pinned = true;
        document.getElementById("more").disabled = false;
        document.getElementById("path").disabled = false;
    }

}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

function changeCity() {
    var city = document.getElementById("cityInput").value.trim();
    var range = document.getElementById("rangeSlider").value;
    document.getElementById("cityInput").value = "";

    if (city == "" || city == null)
        city = "Ljubljana";
    if (city == "Ljubljana")
        placeMarker(new google.maps.LatLng(46.051607, 14.506204), parseFloat(range));
    else if (city == "Maribor")
        placeMarker(new google.maps.LatLng(46.553282, 15.645921), parseFloat(range));
    else if (city == "Celje")
        placeMarker(new google.maps.LatLng(46.240101, 15.265589), parseFloat(range));
    else if (city == "Novo mesto")
        placeMarker(new google.maps.LatLng(45.800472, 15.170543), parseFloat(range));
    else if (city == "Koper")
        placeMarker(new google.maps.LatLng(45.547671, 13.727901), parseFloat(range));
    else if (city == "Piran")
        placeMarker(new google.maps.LatLng(45.525484, 13.569688), parseFloat(range));
    else if (city == "Izola")
        placeMarker(new google.maps.LatLng(45.536270, 13.661452), parseFloat(range));
    else if (city == "Portorož")
        placeMarker(new google.maps.LatLng(45.514639, 13.588602), parseFloat(range));
    else if (city == "Slovenj Gradec")
        placeMarker(new google.maps.LatLng(46.507418, 15.076819), parseFloat(range));
    else if (city == "Trebnje")
        placeMarker(new google.maps.LatLng(45.908187, 15.009448), parseFloat(range));
    else if (city == "Nova Gorica")
        placeMarker(new google.maps.LatLng(45.957144, 13.648184), parseFloat(range));
    else if (city == "Kranj")
        placeMarker(new google.maps.LatLng(46.240547, 14.356423), parseFloat(range));
    else if (city == "Jesenice")
        placeMarker(new google.maps.LatLng(46.434418, 14.054809), parseFloat(range));
    else if (city == "Velenje")
        placeMarker(new google.maps.LatLng(46.363202, 15.115721), parseFloat(range));
    else if (city == "Ptuj")
        placeMarker(new google.maps.LatLng(46.420757, 15.867138), parseFloat(range));
    else if (city == "Murska Sobota")
        placeMarker(new google.maps.LatLng(46.656524, 16.165761), parseFloat(range));
    else if (city == "Trbovlje")
        placeMarker(new google.maps.LatLng(46.147306, 15.048509), parseFloat(range));
    else {
        alert("Vnešeno mesto nima ponudnikov študentske prehrane ali pa ne obstaja!");
    }

}