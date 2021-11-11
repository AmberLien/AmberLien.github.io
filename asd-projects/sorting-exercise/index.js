/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array){
    //iterates over the array
    for (var i = 0; i < array.length - 1; i++){
        for (var j = i + 1; j < array.length; j++){
            if (array[i].value > array[j].value){ //compares the value at index i with the value at index j
                swap(array, i, j); //calls the swap function to switch array[i] and array[j]
                updateCounter(bubbleCounter); //calls the updateCounter function to update the bubbleCounter
                await sleep();
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if (array.length > 1){ //checks to make sure the array has more than 1 element
        var index = await partition(array, left, right); //calls the partition function and assigns a pivot point to index
        if (left < index - 1){ //checks for value left of pivot
            await quickSort(array, left, index - 1); //sorts left side of the pivot
        }
        if (right > index){ //checks for value right of pivot
            await quickSort(array, index, right); //sorts right side of the pivot
        }
    }
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    var pivot = array[Math.floor((right + left)/2)].value; //assigns pivot with a value in the middle of the array
    while (left < right){ //loop will run as long as the left index is less than the right index
        while (array[left].value < pivot){ //checks that the value to the left is less than the pivot
            left++; //increases the value of left
        }
        while (array[right].value > pivot){ //checks that the value to the right is greater than the pivot
            right--; //decreases the value of right
        }
        if (left < right){ //checks if left is less than right
            swap(array, left, right); //swaps left and right
            updateCounter(quickCounter); //calls the updateCounter function
            await sleep();
        }
    }
    return (left + 1);
}

// TODO 1: Implement swap
function swap(array, i, j){
    var temp = array[i]; // temp stores the value of array at index i
    array[i] = array[j]; // switches the value of array[i] with the value at array[j]
    array[j] = temp;     // switches the value of array[j] with the value at array[i]
    drawSwap(array, i, j); //calls drawSwap
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}