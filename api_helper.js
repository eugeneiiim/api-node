(function(){
  "use strict";

  var fs = require('fs');
  var path = require("path");
  var _ = require('underscore');
  var mutate = require('./mutate');
  var request = require("superagent");
  var crypto = require("crypto");
  var JaySchema = require("jayschema");
  var jayschema = new JaySchema();
  var PRODUCTION, TEST;
  var ENDPOINT_INFO = JSON.parse(fs.readFileSync(path.join(__dirname, "/schemas.json")));

  _.templateSettings = {
    interpolate : /\{(.+?)\}/g
  }

  exports.PRODUCTION = PRODUCTION = 0;
  exports.TEST = TEST = 1;
  
  exports.APIHelper = function(api_key, servers){
    var urls = {};
    if(_.isUndefined(servers)){
      servers = TEST;
    }
    if(servers === PRODUCTION){
      urls.restaurant = "https://r.ordr.in";
      urls.user = "https://u.ordr.in";
      urls.order = "https://o.ordr.in";
    } else if(servers === TEST){
      urls.restaurant = "https://r-test.ordr.in";
      urls.user = "https://u-test.ordr.in";
      urls.order = "https://o-test.ordr.in";
    }
    
    function call_api(base_url, method, uri, data, login, callback){
      var full_url, partial, hash;
      full_url = base_url+uri;
      partial = request(method, full_url).set("X-NAAMA-CLIENT-AUTHENTICATION",
                                              'id="'+api_key+'", version="1"');
      if(login){
        hash = crypto.createHash("SHA256");
        hash = hash.update(login.password+login.email+uri).digest("hex");
        partial = partial.set("X-NAAMA-AUTHENTICATION",
                              'username="'+login.email+'", response="'+hash+'", version="1"');
      }
      if(data){
        partial = partial.type("form").send(data);
      }
      partial.end(function(res){
        if(res.ok){
          callback(null, res.body);
        } else {
          callback(new Error(res.error));
        }
      });
    };

    this.call_endpoint = function(endpoint_group, endpoint_name, url_params, kwargs, callback){
      var data, validation, arg_dict, data, tmpl, uri;
      var endpoint_data = ENDPOINT_INFO[endpoint_group][endpoint_name];
      var value_mutators = {};
      _.each(endpoint_data.properties, function(info, name){
        if(_.has(info, 'mutator')){
          value_mutators[name] = mutate[info.mutator];
        } else {
          value_mutators[name] = mutate.identity;
        }
      });
      _.each(endpoint_data.allOf, function(subschema){
        _.each(subschema.oneOf, function(option){
          _.each(option.properties, function(info, name){
            if(_.has(info, 'mutator')){
              value_mutators[name] = mutate[info.mutator];
            } else {
              value_mutators[name] = mutate.identity;
            }
          });
        });
      });
      if(!_.has(value_mutators, 'email')){
        value_mutators.email = mutate.identify;
      }
      validation = jayschema.validate(kwargs, endpoint_data);
      if(!_.isEmpty(validation)){
        callback(new Error(validation));
        return;
      }
      arg_dict = _.object(_.map(url_params, function(name){
        return [name, encodeURIComponent(value_mutators[name](kwargs[name]))];
      }));
      console.log(arg_dict);
      data = _.object(_.filter(_.map(kwargs, function(value, name){
        if(_.has(value_mutators, name)){
          return [name, value_mutators[name](value)];
        }
      }), function(item){
        
        return item && !(_.contains(url_params, item[0]) || item[0] === 'current_password');
      }));
      tmpl = _.template(endpoint_data.meta.uri);
      uri = tmpl(arg_dict);
      if(endpoint_data.meta.userAuth){
        if(!(_.has(kwargs, 'email') && _.has(kwargs, 'current_password'))){
          callback(new Error("Authenticated request requires arguments 'email' and 'current_password'"));
          return;
        }
        call_api(urls[endpoint_group], endpoint_data.method, uri, data,
                 {email : kwargs.email, password : mutate.sha256(kwargs.current_password)},
                 callback);
      } else {
        call_api(urls[endpoint_group], endpoint_data.method, uri, data, null, callback);
      }
    }
  };
}());
