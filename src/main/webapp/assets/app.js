$(function () {

    getBooks();

});

function getBooks() {
    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function(result) {
        displayBooks(result)
    });
}


function displayBooks(books) {
    var tbody = $('#tbody');
    for (var i = 0; i < books.length; i++) {
        var nextTr = $("<tr>" +
            // "<td class='clickable' data-id='" + books[i].id + "'>&#9662; " + books[i].author + "<div class='invisible'> " + i + "</div></td>" +
            // "<td class='title'>" + books[i].title + "</td>" +
            "<td class='title clickable' data-id='" + books[i].id + "'>&#9662; " + books[i].title + "<div class='invisible'> " + i + "</div></td>" +
            "<td>" + books[i].author + "</td>" +
            "<td>" + "<a href='#'>Usuń</a>" + "</td>" +
            "</tr>")
        nextTr.appendTo(tbody);
    }
    addClick();
}

function addClick() {

    var titles = $(".clickable");
    for (var i = 0; i < titles.length; i++) {
        titles.eq(i).on("click", function () {
            var div = $(this).find("div");

            if (div.is(":visible")) {
                div.slideUp();
            } else {

                $.ajax({
                    url: "http://localhost:8282/books/" + $(this).data("id"),
                    data: {},
                    type: "GET",
                    dataType: "json"
                }).done(function(result) {
                        div.html(
                            "Id: " + result.id + "<br>" +
                            "ISBN: " + result.isbn + "<br>" +
                            "Wydawca: " + result.publisher + "<br>" +
                            "Gatunek: " + result.type
                            );
                    div.slideDown();
                });

            }
        })
    }

}