$(function () {

    getBooks();


function getBooks() {
    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function(result) {
        displayBooks(result)
    }).fail(function(xhr,status,err) {
    }).always(function(xhr,status) {
    });
}

function displayBooks(books) {
    var tbody = $('#tbody');
    for (var i = 0; i < books.length; i++) {
        var nextTr = $("<tr>" +
                        "<td>&#9662; " + books[i].author + "<div></div></td>" +
                        "<td>" + books[i].title + "</td>" +
                        "<td>" + "<a href='#'>Usuń</a>" + "</td>" +
                        "</tr>");
        nextTr.appendTo(tbody);
    }
}






});