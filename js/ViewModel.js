var WeaponViewModel = function(name, weight, ammoType, closeCombatRating, rangeRating) {
	this.name = ko.observable(name);
	this.weight = ko.numericObservable(weight || 0);
	this.ammoType = ko.observable(ammoType || 'Ilimitada');
	this.closeCombatRating = ko.observable(closeCombatRating || 0);
	this.rangeRating = ko.observable(rangeRating || 0);
	this.ammoTypes = ['Ilimitada', 'Frecuente', 'Normal', 'Rara'];
};

var MainViewModel = function() {

	var self = this;
	self.weapons = ko.observableArray();
	
	self.weapons.push(new WeaponViewModel('Martillo', 1, 'Ilimitada', 4, 0));
	self.weapons.push(new WeaponViewModel('Machete', 1, 'Ilimitada', 5, 0));
	self.weapons.push(new WeaponViewModel('Pistola', 1, 'Frecuente', 0, 3));
	self.weapons.push(new WeaponViewModel('Carabina', 3, 'Normal', 0, 4));

	self.newWeaponName = ko.observable();
	
	self.add = function() {
		self.weapons.push(new WeaponViewModel(self.newWeaponName()));
		self.newWeaponName('')
	};
	
	self.cancelAdd = function() {
		self.newWeaponName('');
	};
	
	self.selectedWeapon = ko.observable();
	
	self.remove = function() {
		// Here, "this" is a WeaponModel (thanks to Knockout)
		self.weapons.remove(this);
	}
	
	self.edit = function() {
		self.selectedWeapon(this);
	}
	
	self.totalWeight = ko.computed(function() {
		var total = 0;
		ko.utils.arrayForEach(self.weapons(), function(w) {
			total = total + w.weight();
		});
		return total;
	}, this);
};git 