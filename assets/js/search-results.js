//  or could have used document.read()

$(function () {
      // Elements:
      var searchFormEl = $('#search-form');
      var searchInputEl = $('#search-input'); // ex, George Washington
      var formatEl = $('#format');
      var searchTermEl = $('#search-term');
      var searchResultsEl = $('#search-results');
      var backBtnEl = $("#back-btn");

      // functions: 
      function init() { // updates the search display
            populateFormValues();
            updateSearchDisplay();
            getSearchResults();

      }
      function getSearchResults() {
            // buld a string that hits the loc api
            var url = 'https://www.loc.gov'
            var format = formatEl.val();
            var q = searchInputEl.val();

            if (!q) {
                  return;
            }

            if (format) {
                  url += "/" + format;
            } else {
                  url += "/search"
            }

            url += "?q=" + q + "&fo=json";

            fetch(url).then(function (response) {
                  return response.json();
            }).then(function (data) {
                  console.log(data);
                  renderResults(data)
            })

      }

      function renderResults(data) {
            if (data.results && data.results.length) {
                  data.results.forEach(function (result) {//foreach loop through every item in the collection.
                        // build card: 
                        console.log(result)
                        var card = $("<div>");
                        card.addClass("card mb-3");

                        var cardBody = $("<div>");
                        cardBody.addClass("card-body");
                        card.append(cardBody);

                        var cardTitle = $("<h5>");
                        cardTitle.text(result.title);
                        card.append(cardTitle);

                        var date = $("<p>");
                        date.addClass("mb-1")
                        var dateText = "No date for this entry.";
                        if(result.date) {
                              dateText = result.date;
                        }
                        date.text("Date: " + dateText);
                        cardBody.append(date);

                        var subjects = $("<p>");
                        subjects.addClass("mb-1");
                        var subtectText = "No subject for this entry.";
                        if(result.subject && result.subject.length) {
                              subtectText =  result.subject.join(", ")
                        }
                        subjects.text("subjects: " + subtectText);
                        cardBody.append(subjects);

                        var description = $("<p>");
                        var descriptionText = "No descriptin for this entry.";
                        if(result.description && result.descrioption.length){
                              descriptionText= result.descrioption[0];
                        }
                        description.text("description: " + descriptionText);
                        cardBody.append(description);

                        var link = $("<a>");
                        link.addClass("btn btn-primary");
                        link.attr("href", result.url);
                        link.attr("target", "_blank");
                        link.text("read more");

                        cardBody.append(link)

                        searchResultsEl.appendChild(card);

                  })
            }
      }

      function updateSearchDisplay() {
            searchTermEl.text(searchInputEl.val())
      }

      function populateFormValues() {
            var url = new URL(window.location) // used instead of parsing the url bc it gets messy.
            var q = url.searchParams.get("q");  // searchParams gets you back the url parameter requested.
            var format = url.searchParams.get("format"); // getting the names out.

            searchInputEl.val(q);
            formatEl.val(format);
      }

      function handleSearchFormSubmit(event) {
            event.preventDefault();
            searchResultsEl.empty(); // jquery that clears the contents of the search result.

            console.log(event.target)
            getSearchResults();
      }

      function handleBackButtonClick(event) {
            event.preventDefault();
            event.stopPropagation();
            location.assign("index.html");
      }

      // event listenrer: 
      backBtnEl.on("click", handleBackButtonClick)
      searchFormEl.on("submit", handleSearchFormSubmit)


      // initialize: 
      init();
});


/* NOTES:   
      - how do they get the values inputed in index to go to search-results.html? 
      ans: we get them from the url query string.


*/

/* BUGS: 
      - the name and the format are not populating to the other page.

*/ 