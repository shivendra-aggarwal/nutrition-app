function searchNutrition(searchText){
	console.log(searchText);
	$.ajax({
		type: 'GET',
		async: false,
		url: 'https://api.nutritionix.com/v1_1/search/'+searchText+'?'+
		'fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=09784901&appKey=eb1d62406422d480eb3830bd895a46bd',
		success: function(d){
			return d;
		}
	})
}