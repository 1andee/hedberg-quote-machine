$(() => {

  // Create array of quote Index positions upon page load
  const fetchQuote = quoteArray();
  let quoteIndex = [];

  for (i in fetchQuote) {
    quoteIndex.push(i);
  };

  // Ensure each quote is unique, reload window if all have been shown
  let getNumber = function () {
    if (quoteIndex.length == 0) {
      location.reload();
    }
    let index = Math.floor(quoteIndex.length * Math.random());
    let unique = quoteIndex.splice(index, 1);
    return unique[0];
  };

  // Render first quote upon page load
  renderQuote();

  // Render subsequent quotes upon button click
  $(".btn").on("click", () => {
    console.log(quoteIndex);
    $(".quote-container").fadeOut(400, function() {

      // Reset quote-container elements to initial state
      $("#mitch").html('- Mitch Hedberg');
      $("#mobile-only-tweet-button").html('');
      $("button").blur();

      renderQuote();

      $(".quote-container").fadeIn(600);
    });

  });

  function renderQuote() {
    let quote = fetchQuote[getNumber()];
    $("#quote").text(quote);
    let signature = ' - Mitch Hedberg';

    // Add tweet icon if <= 140 chararcters
    if (quote.length + signature.length <= 140) {
      let prefix = 'https://twitter.com/intent/tweet?text='
      let convertedQuote = encodeURIComponent(quote);
      let convertedSignature = encodeURIComponent(signature);

      $("#mitch").append(`<a href="${prefix}${convertedQuote}${convertedSignature}" target="_blank"><i class="fa fa-twitter-square fa-lg" aria-hidden="true"></i></a>`);

      $("#mobile-only-tweet-button").append(`Tweet it! <a href="${prefix}${convertedQuote}${convertedSignature}" target="_blank"><button><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></button></a>`);
    };
  };

});
