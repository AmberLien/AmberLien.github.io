// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify);




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
    //iterates through the image array
    for (var r = 0; r < image.length; r++){
        for (var c = 0; c < image[r].length; c++){
            //stores individual rgbString in a variable
            var rgbString = image[r][c];

            //converts rgbString to an array with 3 values -- the indices of red, green, and blue
            var rgbNumbers = rgbStringToArray(rgbString);
            
            //calls filterFunction
            filterFunction(rgbNumbers);

            //stores new rgb values in rgbString
            rgbString = rgbArrayToString(rgbNumbers);

            //changes the values in image to the new rgb values
            image[r][c] = rgbString;
        }
    }
}
// TODO 6: Create the applyFilterNoBackground function


// TODO 3 & 5: Create filter functions
function reddify(arr){
    arr[RED] = 255; //changes the RED index of an array to 255
}

// CHALLENGE code goes below here
