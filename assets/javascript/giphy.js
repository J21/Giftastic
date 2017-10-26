$('document').ready(function(){
     //test if the ready function works
	console.log("Ready for the sweet stuff!");

//global variables
var buttonHTML = '';
var dessertArray = ["Desserts"]; 
var newdessertItem;
var GIFarray = [];


//create buttons, initial load
function createTheButtons() {
     //loops through and creates buttons for elements currently in the array
     for (var i = 0; i < dessertArray.length; i++) {
          buttonHTML += "<button class='btn btn-lrg btn-success dessertButtons' dessertName=" + dessertArray[i] + ">" + dessertArray[i] + "</button>";
     }
     $('#buttonsDiv').html(buttonHTML);
}

//references the function above that creates the buttons
createTheButtons();

//when clicking the submit button on html
$('body').on('click', '#submitUserData', function(event){
     event.preventDefault(); //stops refresh of page
     newdessertItem = $('#userInput').val(); //captures value of user input
     var newdessertButton = "<button class='btn btn-lrg btn-success dessertButtons' dessertName=" + newdessertItem + ">" + newdessertItem + "</button>";
     $('#buttonsDiv').append(newdessertButton);//append scope-limited variable html to #buttonsDiv as new button.
});

//on click of body, listen for class of foodButtons, if match, run this function.
$('body').on('click', '.dessertButtons', function(event){
     $('.GIFdiv').empty(); //clear div of old GIFs.
     var chosendessertItem = $(this).attr('dessertName'); 
     //ajax to giphy.com for desserts, limit  is 10.
     queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosendessertItem + "&limit=10" +"&api_key=dc6zaTOxFJmzC";//The API Key.
     $.ajax({url: queryURL, method: 'GET'}).done(function(response)/*on completion of ajax, run this function for each item returned*/ {
               console.log(queryURL);
               for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                    $('.GIFdiv').append("<div class='GIFbox'><p class='title'>Rating: "+ response.data[i].rating.toUpperCase() +"</p><div class='image-container'><img class='foodIMG img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    GIFarray.push(response.data[i].images.downsized.url);
               }
               $(".giphyFooter").removeClass("hideMe");
          }); //end ajax

}); //end body on click

//deletes all buttons that are not in the array when clear is clicked
$('body').on('click', '#clearAllData', function(event){
     for(var i = 0; i < dessertArray.length; i++){
          dessertArray[i] = "";
     }
     $('#buttonsDiv').html();
});

//on click, animate gifs
$('body').on('click', '.foodIMG', function(){
     var state = $(this).attr('data-state');
     var GIFnotMoving = $(this).attr('data-still');
     var GIFmoving = $(this).attr('data-animate');
     if (state === 'still') {
          $(this).attr('src', GIFmoving);
          $(this).attr('data-state', 'animate');
     }//on second click, return gif to beginning.
     else if (state !== "still") {
          $(this).attr('src', GIFnotMoving);
          $(this).attr('data-state', 'still');
     };
});  // end foodIMG on click

});//end document.ready