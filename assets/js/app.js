 // Initial Categories
 var topics = ["cat", "dog", "mice", "lion", "elephant", "giraffe"];

 function displayGiphy() {

   $("#giphys-view").empty();
   var topic = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GnHiFNZ349iRdM6Gcu92q0998zNYR6R6&q=" + topic +
     "&limit=10";

   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function (response) {

     for (var x = 0; x < response.data.length; x++) {
       var giphyDiv = $("<div class='topic'>");

       //grab rating Seems to be pointing to my computer maybe this is why I can't get giphyDiv to work?
       var rating = response.data[x].rating;
       var pOne = $("<p>").text("Rating: " + rating);
       console.log(rating);

       giphyDiv.append(pOne);
       $("#giphy-view").append(giphyDiv);

       //grab images
       var stillUrl = response.data[x].images.fixed_height_still;
       var animatedUrl = response.data[x].images.bitly_gif_url;
       console.log(stillUrl);
       var image = $("<img>").attr("src", stillUrl);
       var animate = $("<img>").attr("src", animatedUrl);
       console.log(image);
       $("<img>").attr('src', stillUrl).prependTo(giphyDiv);
       // $("#giphy-view").html(giphyDiv);

       $("<img>").attr('src', response.data[x].images.fixed_height_still.url).prependTo("#giphys-view");
     }

     // var stillImg = $("<img>").attr("src", stillUrl);
     // $("<img>").attr('src', response.data[0].images.original.url).appendTo("body");

     // giphyDiv.append(stillImg);
     // $("#giphy-view").append(giphyDiv);
   });
 }

 function renderButtons() {
   $("#buttons-view").empty();
   for (var i = 0; i < topics.length; i++) {
     var a = $("<button>");
     a.addClass("giphy-btn");
     a.attr("data-name", topics[i]);
     a.text(topics[i]);
     $("#buttons-view").append(a);
   }
 }

 $("#add-giphy").on("click", function (event) {
   event.preventDefault();
   if ($("#giphy-input").val() !== '') {
     var topic = $("#giphy-input").val().trim();
     $("#giphy-input").val("");
     topics.push(topic);
     console.log(topics);
     renderButtons();
   }
 });

 // Code to start and stop images. Need to add ".gif" class to images, but don't seem to be grabbing them right

 // $(".gif").on("click", function() {
 // // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
 // var state = $(this).attr("data-state");
 // // If the clicked image's state is still, update its src attribute to what its data-animate value is.
 // // Then, set the image's data-state to animate
 // // Else set src to the data-still value
 // if (state === "still") {
 //   $(this).attr("src", $(this).attr("data-animate"));
 //   $(this).attr("data-state", "animate");
 // } else {
 //   $(this).attr("src", $(this).attr("data-still"));
 //   $(this).attr("data-state", "still");
 // }

 $(document).on("click", ".giphy-btn", displayGiphy);
 renderButtons();
