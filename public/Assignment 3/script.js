$(document).ready(function() {

    $("#search").on("click", call);

    function call() {
        $.ajax({
            method: "GET",
            url: "https://www.behindthename.com/api/lookup.json?key=id421234648&name=" + $("#input").val(),
            dataType: "json",

            success: function(data) {
                console.log(data);
                resetHtml();
                
                if (data.error_code == 50) {
                    // Name not found
                    $("#error").css("color", "green")
                    $("#error").html(data.error)
                }

                else {
                    // Name found
                    setImages(data);
                    setNames(data);
                }
            }
        })
    }

    function setNames(data) {
        $("#name").html("<strong>This name is :</strong>");

        for (var i = 0; i < data[0].usages.length; i++) {
            $("#list").append("<li>" + data[0].usages[i]["usage_full"] + "</li>");
        }
    }

    function setImages(data) {
        if (data[0].gender.includes("m")) {
            $("#images").append("<img class='gender' src='img/male.png' alt='test'>");
        }

        if (data[0].gender.includes("f")) {
            $("#images").append("<img class='gender' src='img/female.png' alt='test'>");
        }
    }

    function resetHtml() {
        $("#images").html("");
        $("#error").html("");
        $("#list").html("");
        $("#name").html("");
    }
})