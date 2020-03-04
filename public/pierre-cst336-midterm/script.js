$(document).ready(function() {

	$("#submit").on("click", request);

	function request () {
		$.ajax({
    		method: "GET",
    		url: "https://openlibrary.org/api/books?bibkeys=ISBN:" + $("#ISBN").val() + "&format=json&jscmd=data",
    		//0451526538
    		//$("#ISBN")
    		dataType: "json",
    		data:{},


    		success: function(data) {
    			//0451526538
			    var getData = data["ISBN:" + $("#ISBN").val()];
			    $("#img").attr("src", getData.url);
			    $("#title").html("Title: " + getData.title);
			    $("#author").html("Author: " + getData.authors[0].name);
			    $("#publisher").html("Publisher: " + getData.publishers[0].name);
			    $("#publishyear").html("Publish year: " + getData.publish_date);
			    $("#pages").html("Pages: " + getData.number_of_pages);
			    $("#isbn").html("ISBN: " + $("#ISBN").val());
			},

       		error: function(error) {
       			alert("error");
       		}
    	})
	}

})