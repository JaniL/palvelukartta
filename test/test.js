var assert, pk, models, idModels;
assert = require("assert");
pk = require("../lib/palvelukartta.js");

// only included models that don't stress much if everything is retrieved
models = ['organization', 'arealcity'];

idModels = {
  'organization': 91,
  'department': 'SOSV',
  'arealcity': 91,
  'unit': 1,
  'service': 26244,
  'servicetree': 25554,
  'accessibility_variable': 1
};

describe('Palvelukartta', function() {
  describe("#itemRetrieve()", function() {

    models.forEach(function(model) {
      it('should return items from model ' + model + ' without error', function(done) {
        pk.itemRetrieve(model, null, function(err, cb) {
          if (err) throw err;
          done();
        });
      });
    });

/*

    for (var key in idModels) {
      var value;
      value = idModels[key];

      it('should return item with id ' + value + ' from model ' + key, function(done) {
        pk.itemRetrieve(key, { id: value }, function(err, cb) {
          if (err) throw err;
          done();
        });
      });
    }

*/


    it('should return organization with id 91 without error', function(done) {
      pk.itemRetrieve('organization', { id: 91 }, function(err, cb) {
        if (err) throw err;
        done();
      });
    });


    it('should return units that belong to organization with id 1000 without error', function(done) {
      pk.itemRetrieve('unit', { organization: 1000 }, function(err, cb) {
        if (err) throw err;
        done();
      });
    });

    it('should return units are within 250 meters from specified coordinates without error', function(done) {
      this.timeout(10000);
      pk.itemRetrieve('unit', { lat: 60.18406, lon: 24.94936, distance: 250 }, function(err, cb) {
        if (err) throw err;
        done();
      });
    });
  });
});