// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify); //filters the image to be more red

    applyFilter(decreaseBlue); //filters the image to decrease blue
    
    applyFilter(increaseGreenByBlue); //filters the image to increase green by blue


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
function applyFilterNoBackgroud(){
    
}

// TODO 3 & 5: Create filter functions

//reddifies the image
function reddify(arr){
    arr[RED] = 255; //changes the RED index of an array to 255
}

//decreases the blue in the image
function decreaseBlue(arr){
    arr[BLUE] = keepInBounds(arr[BLUE] - 50);
}

//increases green by blue
function increaseGreenByBlue(arr){
    arr[GREEN] = keepInBounds(arr[GREEN] + arr[BLUE]);
}

//ensures that rgb colors are 0 <= num <= 255
function keepInBounds(num){
    var number = (Math.max(num, 0)); //If num < 0, number will store 0. Otherwise, it will store num.
    number = (Math.min(number, 255)); //If number > 255, number will store 255. Otherwise, it will store number.
    return number;
}

// CHALLENGE code goes below here
