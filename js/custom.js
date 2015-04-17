var obJson;	

$(document).ready(function() {
	//Copy data from other site
	var url = 'http://events.stanford.edu/2014/October/5/',
		objEvent= '',
		objects,
		jsonEvents;	
	
	$.ajax({
		crossOrigin: true,
		url: url,
		context: {},
		success: function(data) {
			objects = data;
			mapear();
		}
	})

	//Separate items
	function mapear() {
		var divN = objects.indexOf('<div id="main-content"'),
			divN2 = objects.indexOf('<!-- Start #sidebar-second -->'),
			divRest = divN2 - divN,
			divSet = objects.substr(divN,divRest),
			totalItems;

		//Reset syntax
		$('.clear').html(divSet);
		$(".postcard-link br").remove();
		$('.postcard-link').html(function(i,h){
		    return h.replace(/&nbsp;/g,'');
		});
		$('.postcard-link').html(function(i,h){
		    return h.replace(/\s\s+/g, ' ');
		});
		$('.postcard-link').html(function(i,h){
		    return h.replace("'", "");
		});
		totalItems = $('.postcard-left').length;

		//Preparate Json object
		$('.postcard-link').find('.postcard-left').each( function(index){
			var titleT = $('h3', this).text(),
				title = $.trim(titleT),
				dateT = $('p strong', this).text(),
				date = $.trim(dateT),
				domine = 'http://events.stanford.edu',
				img = $('.postcard-image img', this).attr('src'),
				domineImg = domine+img,
				finishJson;

			if (index === totalItems - 1) {
		        finishJson = '"}';
		    } else {
		    	finishJson = '"},';
		    }
		    objEvent += '{"title":' + '"' + title + '"'+ ',"date":' + '"' + date + '"' + ',"img":' + '"' + domineImg + finishJson;
		});

		//Convert strings to Json object
		jsonEvents = '{"events":[' + objEvent + ']}';
		obJson = JSON.parse(jsonEvents);
		$('.clear').remove();
	}
	setTimeout(function() {
      console.clear();
	}, 1800);

	//Swiche view
	$( '.view-list' ).click(function() {
		$('.type-view').attr("id","list");
	});

	$( '.view-grid' ).click(function() {
		$('.type-view').attr("id","grid");
	});

	//Filter bar to fixe position
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 150) {
	       $('.content-filter-bar').addClass('filter-bar-scrolltop');
	       $('.search-filter').addClass('active');
	    } else {
	       $('.content-filter-bar').removeClass('filter-bar-scrolltop');
	       $('.search-filter').removeClass('active');
	    }
	});
	
}); 

//--Angular Events

var app = angular.module('myapp', []);

//Json object in my Angular controller
app.controller('myController', function($scope, $timeout) {
    $timeout( function(){ 
    	var json = obJson;
    	$scope.myscope = json;
    }, 2500);//Time while load items
});