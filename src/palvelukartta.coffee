request = require 'superagent'
API_VERSION = 2
API_ADDRESS = 'http://www.hel.fi/palvelukarttaws/rest/v' + API_VERSION

module.exports.itemRetrieve = (model, searchParams, cb) ->
  URL = API_ADDRESS + '/' + model + '/'
  if searchParams?
    if searchParams.id
      URL = URL + searchParams.id + '/'
      searchParams.id = undefined
    if searchParams.accessibility? and searchParams.accessibility is true
      URL = URL + 'accessibility/'
      searchParams.accessibility = undefined
  else
    searchParams = {}
#  console.log(URL);
  request.get(URL).query(searchParams).end (err, res) ->
    if err
      return cb err, null
    else
      return cb null, res.body
  return

#module.exports.unitAccessibility = (unitId, cb) ->
#  # Yes, this looks stupid.
#  module.exports.itemRetrieve 'unit', unitID + '/accessibility', (err, retrieveCb) ->
#    if err
#      return cb err, null
#    else
#      return cb null, retrieveCb
#  return