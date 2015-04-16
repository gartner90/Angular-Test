$(document).ready(function() {
	var url = 'http://events.stanford.edu/2014/October/5/',
		objEvent= '',
		objects,
		obJson,
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

	function mapear() {
		var divN = objects.indexOf('<div id="main-content"'),
			divN2 = objects.indexOf('<!-- Start #sidebar-second -->'),
			divRest = divN2 - divN;
			divSet = objects.substr(divN,divRest);

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

		var totalItems = $('.postcard-left').length;

		$('.postcard-link').find('.postcard-left').each( function(index){
			var titleT = $('h3', this).text(),
				title = $.trim(titleT),
				dateT = $('p strong', this).text(),
				date = $.trim(dateT),
				domine = 'http://events.stanford.edu',
				img = $('.postcard-image img', this).attr('src'),
				domineImg = domine+img;
				if (index === totalItems - 1) {
			        objEvent += '{"title":' + '"' + title + '"'+ ',"date":' + '"' + date + '"' + ',"img":' + '"' + domineImg + '"}';
			    } else {
			    	objEvent += '{"title":' + '"' + title + '"'+ ',"date":' + '"' + date + '"' + ',"img":' + '"' + domineImg + '"},';
			    }
		});
		
		jsonEvents = '{"events":[' + objEvent + ']}';
		obJson = JSON.parse(jsonEvents);
		$('.clear').remove();
		window.globJson = obJson;
	}
	/*setTimeout(function() {
      console.clear();
	}, 1800);*/
	setTimeout(function() {
	     console.log(globJson);
	}, 1800);
	
	 
}); 