$(document).ready(function () {
  // Initial Categories

  var topics = ["cat", "dog", "mice", "lion", "elephant", "giraffe"];

  function initDisplay() {
    $("#giphys-view").empty();
    renderButtons();
  }

  function displayGiphy() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GnHiFNZ349iRdM6Gcu92q0998zNYR6R6&q=" + topic +
      "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      console.log(response.data);
      var results = response.data;

      if (results.length > 0) {

      }

      for (var x = 0; x < results.length; x++) {
        var giphyDiv = $("<div class='topic'>");

        //grab rating Seems to be pointing to my computer maybe this is why I can't get giphyDiv to work?
        var rating = results[x].rating;
        var pOne = $("<p>").text("Rating: " + rating.toUpperCase());
        //  console.log(rating);
        var displayImage = $("<img>");
        displayImage.addClass("giphyimage");
        displayImage.attr("img-animated", "false");
        displayImage.attr("data-still-url", results[x].images.fixed_height_still.url);
        displayImage.attr("data-animate-url", results[x].images.fixed_height.url);
        displayImage.attr("src", results[x].images.fixed_height_still.url)

        giphyDiv.append(pOne);
        giphyDiv.append(displayImage);

        $("#giphys-view").append(giphyDiv);

        //grab images

        $("#giphys-view").on("click", "giphyimage", function () {
          var state = $(this).attr("img-animated");
          var stillUrl = $(this).attr("data-still-url");
          var animatedUrl = $(this).attr("data-animate-url");

          if (state === "false") {
            $(this).attr("img-animated", "true");
            $(this).attr("src", animateUrl);
          } else {
            $(this).attr("img-animated", "false");
            $(this).attr("src", stillUrl);
          }

          //  var image = $("<img>").attr("src", stillUrl);
          //  var animate = $("<img>").attr("src", animatedUrl);
          //  console.log(image);
          //  giphyDiv.append(image);

          //  $("<img>").attr('src', image).append(giphyDiv);
          //  $("#giphys-view").text(giphyDiv);

          // $("<img>").attr('src', response.data[x].images.fixed_height_still.url).prependTo("#giphys-view");
        })
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
  // Add buttons
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
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  // var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  // if (state === "still") {
  //   $(this).attr("src", $(this).attr("data-animate"));
  //   $(this).attr("data-state", "animate");
  // } else {
  //   $(this).attr("src", $(this).attr("data-still"));
  //   $(this).attr("data-state", "still");
  // }

  $(document).on("click", ".giphy-btn", displayGiphy);
  initDisplay()
});