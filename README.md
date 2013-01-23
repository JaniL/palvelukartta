# palvelukartta

Simple JavaScript wrapper for REST interface of Helsinki's Palvelukartta service.

http://www.hel.fi/palvelukartta/
http://www.hel.fi/palvelukarttaws/rest/ver2.html

Wrapper uses the second version of the api.

# Example

For information about what you can retrive, see here:

http://www.hel.fi/palvelukarttaws/rest/

For instance, if you want to retrieve all organizations, type the model you want to browse as the first parameter (in this case it's organization), leave the second parameter as null and enter your callback function as the third parameter:

    var pk = require('palvelukartta');
    pk.itemRetrieve('organization', null, function(err, cb) {
      if (err) {
        console.log(err);
      }
      return(cb);
    });

The second parameter is for search parameters.

If you want a data item with certain id, replace the second parameter with an array containing key id with the value you want:

    var pk = require('palvelukartta');
    var id = 1;
    pk.itemRetrieve('organization', { id: id }, function(err, cb) {
      if (err) {
        console.log(err);
      }
      return(cb);
    });

The API also allows you to search units for example by organization. See the API documentation for more information.

    var pk = require('palvelukartta');
    var id = 1;
    pk.itemRetrieve('unit', { organization: 1000 }, function(err, cb) {
      if (err) {
        console.log(err);
      }
      return(cb);
    });