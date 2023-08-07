$(function () {
      // Elements: 
      var searchFormEl = $('#search-form');
      var searchInputEl = $('#search-input');
      var formatEl = $('#format');


      // functions:
      function handleSearchFormSubmit(event) {
            event.preventDefault();

            var q = searchInputEl.val();
            var format = formatEl.val();

            if(!q){ // false, null, or undefined.
                  return;
            }

            // this replaces the current url with the other html doc with arguemts.
            window.location.replace("search-results.html?q=" + q + "&format=" + format) // cannot go back on browser with .replace.

      }

      // Event listeners: 
      searchFormEl.on('submit', handleSearchFormSubmit);

})



/* NOTES: 

 - %20 is a space between words in a url bc urls cant have spaces.




*/ 