// Custom binding sample from: http://learn.knockoutjs.com/#/?tutorial=custombindings

ko.bindingHandlers.starRating = {
	init: function(element, valueAccessor) {
	
		// Add class starRating to bound element and insert five spans 
		// into the element to hold the rating
		$(element).addClass("starRating");
		for (var i = 0; i < 5; i++)
		   $("<span>").appendTo(element);
	   
		// Handle span events
		$("span", element).each(function(index) {
			$(this).hover(
				// On mouse enter, add hoverChosen css class
				function() { $(this).prevAll().add(this).addClass("hoverChosen", 750) },
				// On mouse leave, remove hoverChosen css class
				function() { $(this).prevAll().add(this).removeClass("hoverChosen", 750) }                
			).click(function() {
				var observable = valueAccessor();  // Get the associated observable
				observable(index+1);               // Write the new rating to it
			});
		});            
	},
	update: function(element, valueAccessor) {
		// Give the first x stars the "chosen" class, where x <= rating
		var observable = valueAccessor();
		$("span", element).each(function(index) {
			$(this).toggleClass("chosen", index < observable());
		});
	}    
};

// "with" binding modified to be used with jQueryMobile
ko.bindingHandlers.jqmWith = {
	'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		return ko.bindingHandlers["with"].init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	},
	'update': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var t = ko.bindingHandlers["with"].update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
		setTimeout(function () {
			// rebuild styles after dom is created
			$(element).trigger("pagecreate"); 
		}, 0);
		return t;
	}
};