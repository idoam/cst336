$(document).ready(function() {

	var defaults = ["Otter", "Sun", "Moon", "Monkey", "Sea"];
	var orientations = ["horizontal", "vertical"];

	on_load();

	function on_load() {
		$.ajax({
    		method: "GET",
    		url: "https://pixabay.com/api/",
    		dataType: "json",
    		data:{
    			"key" : "5589438-47a0bca778bf23fc2e8c5bf3e",
    			"q" : defaults[Math.floor(Math.random() * 5)],
    			"orientation" : orientations[Math.floor(Math.random() * 2)],
    		},
    		success: function(result,status) {
    			for (let i = 0; i < 4; i++) {
    				$("#likes" + i).html("likes : " + result.hits[i].likes);
    				$("#images" + i).html("<img src='" + result.hits[i].previewURL + "'>");
    			}
    			
       		}
    	})
	}


	$("#search").on("click", search);

	function search(){
		$.ajax({
    		method: "GET",
    		url: "https://pixabay.com/api/",
    		dataType: "json",
    		data:{
    			"key" : "5589438-47a0bca778bf23fc2e8c5bf3e",
    			"q" : $("#keyword").val(),
    			"orientation" : $("#orientation option:selected").val(),
    		},
    		success: function(result,status) {
    			for (let i = 0; i < 4; i++) {
    				$("#likes" + i).html("Likes : " + result.hits[i].likes);
    				$("#images" + i).html("<img src='" + result.hits[i].previewURL + "'>");
    			}
       		}
    	})
	}
})