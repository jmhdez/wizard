var Weapon = function(name, weight, ammoType, closeCombatRating, rangeRating) {
	this.name = ko.observable(name);
	this.weight = ko.observable(weight || 0);
	this.ammoType = ko.observable(ammoType || 'Ilimitada');
	this.closeCombatRating = ko.observable(closeCombatRating || 0);
	this.rangeRating = ko.observable(rangeRating || 0);
	
	this.ammoTypes = ['Ilimitada', 'Frecuente', 'Normal', 'Rara'];
};

var ViewModel = function() {

	var self = this;
	self.weapons = ko.observableArray();
	
	self.weapons.push(new Weapon('Martillo', 1, 'Ilimitada', 4, 0));
	self.weapons.push(new Weapon('Machete', 0.4, 'Ilimitada', 5, 0));
	self.weapons.push(new Weapon('Pistola', 1, 'Frecuente', 0, 3));
	self.weapons.push(new Weapon('Carabina', 2.5, 'Normal', 0, 4));

	self.add = function(name) {
		weapons.push(new Weapon(name));
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
		var total = 0, i = 0;
		ko.utils.arrayForEach(self.weapons(), function(w) {
			total += w.weight();
		});
		return total;
	}, this);
};