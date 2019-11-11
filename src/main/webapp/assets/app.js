$(function () {
    displayBooks();
});

function displayBooks() {
    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function(result) {
        $('#tbody').empty();
        for (var i = 0; i < result.length; i++) {
            var nextTr = $("<tr>" +
                "<td class='titles' data-id='" + result[i].id + "'>&#9662; " + result[i].title + "<div class='invisible'></div></td>" +
                "<td>" + result[i].author + "</td>" +
                "<td>" + "<button class='edit' data-id='" + result[i].id + "'>Edytuj</button> &nbsp;&nbsp;" +
                "<button class='del' data-id='" + result[i].id + "'>Usuń</button> &nbsp;&nbsp;" + "</td>" +
                "</tr>")
            nextTr.appendTo(tbody);
        }
        deactivateElements();
        activateElements();
    });
}

function deactivateElements() {
    $("#submit").off("click");

    var titles = $(".titles");
    for (var i = 0; i < titles.length; i++) {
        titles.eq(i).off("click");
    }

    var edits = $(".edit");
    for (var i = 0; i < edits.length; i++) {
        edits.eq(i).off("click");
    }

    var deletes = $(".del");
    for (var i = 0; i < deletes.length; i++) {
        deletes.eq(i).off("click");
    }
}

function activateElements() {
    activateBookAddForm();
    activateBookDetailsSlideDown();
    activateEditButtons();
    activateDeleteButtons();
}


function activateBookDetailsSlideDown() {

    var titles = $(".titles");
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

function activateBookAddForm() {

    $("#submit").on("click", function (event) {

        event.preventDefault()

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
            displayBooks();
        });


    })
}

function activateDeleteButtons() {

    var deletes = $(".del");
    for (var i = 0; i < deletes.length; i++) {
        deletes.eq(i).on("click", function () {
            $.ajax({
                url: "http://localhost:8282/books/" + $(this).data("id"),
                method: "DELETE"
            }).done(function(result) {
                displayBooks();
            });

        })
    }
}

function activateEditButtons() {

    var edits = $(".edit");
    for (var i = 0; i < edits.length; i++) {
        edits.eq(i).on("click", function () {
            var bookId = $(this).data("id")
            $.ajax({
                url: "http://localhost:8282/books/" + bookId,
                data: {},
                type: "GET",
                dataType: "json"
            }).done(function(result) {

                $("#title").val(result.title);
                $("#author").val(result.author);
                $("#publisher").val(result.publisher);
                $("#isbn").val(result.isbn);
                $("#type").val(result.type);


                $(".edit").off("click");
                $(".edit").on("click", function () {
                    alert("Proszę najpierw dokończyć lub anulować aktualną modyfikację")
                });

                var cancel = $('<button id="cancel">Anuluj</button>');
                $("button#submit").text("Uaktualnij");
                $("button#submit").parent().append(cancel);
                $("button#submit").off("click");


                $("button#cancel").on("click", function (event) {
                    event.preventDefault()
                    $("#title").val("");
                    $("#author").val("");
                    $("#publisher").val("");
                    $("#isbn").val("");
                    $("#type").val("");
                    $("button#submit").text("Zapisz");
                    $("button#cancel").remove();
                    displayBooks();
                })

                $("button#submit").on("click", function (event) {
                    event.preventDefault()
                    $("button#cancel").remove();
                    $("button#submit").text("Zapisz");

                    var title = $("#title");
                    var author = $("#author");
                    var publisher = $("#publisher");
                    var isbn = $("#isbn");
                    var type = $("#type");

                    $.ajax({
                        url: "http://localhost:8282/books/" + bookId,
                        data: JSON.stringify({
                            id: bookId,
                            title: title.val(),
                            author: author.val(),
                            publisher: publisher.val(),
                            isbn: isbn.val(),
                            type: type.val()
                        }),
                        method: "PUT",
                        contentType: "application/json"
                    }).done(function(result) {
                        title.val("");
                        author.val("");
                        publisher.val("");
                        isbn.val("");
                        type.val("");
                        displayBooks();
                    });
                })



            });

        })
    }
}