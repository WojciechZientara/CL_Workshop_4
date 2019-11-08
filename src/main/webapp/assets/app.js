$(function () {

    getBooks();
    setForm();

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
    tbody.empty()
    for (var i = 0; i < books.length; i++) {
        var nextTr = $("<tr>" +
            // "<td class='clickable' data-id='" + books[i].id + "'>&#9662; " + books[i].author + "<div class='invisible'> " + i + "</div></td>" +
            // "<td class='title'>" + books[i].title + "</td>" +
            "<td class='title clickable' data-id='" + books[i].id + "'>&#9662; " + books[i].title + "<div class='invisible'></div></td>" +
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
                    var html = $(this).parent().html();
                    div.slideDown();
                });

            }
        })
    }
}

function setForm() {

    var submit = $("#submit");
    submit.on("click", function () {

        var title = $("#title");
        var author = $("#author");
        var publisher = $("#publisher");
        var isbn = $("#isbn");
        var type = $("#type");

        $.ajax({
            url: "http://localhost:8282/books",
            data: JSON.stringify({
                title: title.val(),
                author: author.val(),
                publisher: publisher.val(),
                isbn: isbn.val(),
                type: type.val()
            }),
            method: "POST",
            contentType: "application/json"
        }).done(function(result) {
            title.val("");
            author.val("");
            publisher.val("");
            isbn.val("");
            type.val("");
            getBooks();
        });


    })
}