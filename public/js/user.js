console.log('ChampChart');

$(function() {
	// Event listener for drop-down menu change
	$('#dataset-select').change(function(){
		document.location.href="/user/" + $('#dataset-select').val();
	});

});
