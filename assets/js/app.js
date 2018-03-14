$(document).ready(function () {

  // Initial Topics
  var topics = ["cat", "dog", "mice", "lion", "elephant", "giraffe"];

  //clear display
  function initDisplay() {
    $("#giphys-view").empty();
    renderButtons();
  }

  // Display 10 images based on topic clicked
  function displayGiphy(topic) {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GnHiFNZ349iRdM6Gcu92q0998zNYR6R6&q=" + topic +
      "&limit=10";

    // Query Giphy using ajax query
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      console.log(response.data);
      var results = response.data;

      // build the screen with the images and rating
      if (results.length > 0) {
        $("#giphys-view").empty();
        for (var x = 0; x < results.length; x++) {
          var giphyDiv = $("<div class='topic'>");

          //grab rating Seems to be pointing to my computer maybe this is why I can't get giphyDiv to work?
          var rating = results[x].rating;
          var pOne = $("<p>").text("Rating: " + rating.toUpperCase());
          
          var displayImage = $("<img>");

          displayImage.addClass("gif");
          displayImage.attr("img-animated", "false");
          displayImage.attr("data-still-url", results[x].images.fixed_height_still.url);
          displayImage.attr("data-animate-url", results[x].images.fixed_height.url);
          displayImage.attr("src", results[x].images.fixed_height_still.url)


          giphyDiv.append(pOne);
          giphyDiv.append(displayImage);
          // console.log(displayImage);

          $("#giphys-view").append(giphyDiv);
        }
      }
    });
  }
  //grab images

  $("#giphys-view").on("click", ".gif", function () {
    var state = $(this).attr("img-animated");
    var stillUrl = $(this).attr("data-still-url");
    var animatedUrl = $(this).attr("data-animate-url");

    if (state === "false") {
      $(this).attr("img-animated", "true");
      $(this).attr("src", animatedUrl);
    } else {
      $(this).attr("img-animated", "false");
      $(this).attr("src", stillUrl);
    }
  });

  function renderButtons() {
    $("#buttons-view").empty();
    for (var x = 0; x < topics.length; x++) {
      var gifBtn = $("<button>");
      gifBtn.addClass("giphy-btn");
      gifBtn.attr("data-name", topics[x]);
      gifBtn.text(topics[x]);
      $("#buttons-view").append(gifBtn);
    }
    $("#giphys-view").empty();
  };
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
  $("#buttons-view").on("click", "giphy-btn", function () {
      var topic = $(this).attr("data-name");
      displayGiphy(topic);
    }),

    $(document).on("click", ".giphy-btn", displayGiphy);
  renderButtons();
});