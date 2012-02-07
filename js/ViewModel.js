function MainViewModel() {

	var self = this;
	
	self.weapons = ko.observableArray();
	self.weapons.push(new EditWeaponViewModel('Martillo', 1, 'Ilimitada', 4, 0));
	self.weapons.push(new EditWeaponViewModel('Machete', 1, 'Ilimitada', 5, 0));
	self.weapons.push(new EditWeaponViewModel('Pistola', 1, 'Frecuente', 0, 3));
	self.weapons.push(new EditWeaponViewModel('Carabina', 3, 'Normal', 0, 4));

	self.newWeapon = new NewWeaponViewModel(self.weapons);

	self.selectedWeapon = ko.observable();
	
	self.remove = function() {
		// Here, "this" is a WeaponModel (thanks to Knockout)
		self.weapons.remove(this);
	};
	
	self.edit = function() {
		self.selectedWeapon(this);
	};
	
	self.totalWeight = ko.computed(function() {
		var total = 0;
		ko.utils.arrayForEach(self.weapons(), function(w) {
			total = total + w.weight();
		});
		return total;
	}, this);
};

function EditWeaponViewModel(name, weight, ammoType, closeCombatRating, rangeRating) {
	this.name = ko.observable(name);
	this.weight = ko.numericObservable(weight || 0);
	this.ammoType = ko.observable(ammoType || 'Ilimitada');
	this.closeCombatRating = ko.observable(closeCombatRating || 0);
	this.rangeRating = ko.observable(rangeRating || 0);
	this.ammoTypes = ['Ilimitada', 'Frecuente', 'Normal', 'Rara'];
};

function NewWeaponViewModel(existingWeapons) {
	
	var self = this;
	self.name = ko.observable('');
	
	this.clear = function() {
		self.name('')
	};
	this.add = function() {
		existingWeapons.push(new EditWeaponViewModel(self.name()));
		self.clear();
	};
}

