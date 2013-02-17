/**
 * Weather
 * 
 * author: Hiroki Toyokawa
 * created at: 2013-02-17
 */
var Weather = Backbone.Model.extend({
  defaults: {
      "pref": 13
  },
  url: function(){
    return "http://localhost/backbone_sample/pipe.php?pref=" + this.get("pref");
  },
  sync: function(method, model, options){
    var params = _.extend({
      url: model.url(),
      dataType: "jsonp",
      jsonpCallback: "callback"
    }, options);
    
    Backbone.sync(method, model, params);
  },
  parse: function(res){
    var parsed;
    var pref = this.get("pref");
    
    if (pref == 13) {
      parsed = res.pref.area["東京地方"];
    } else if (pref == 27) {
      parsed = res.pref.area;
    }
    
    console.log(parsed);
    
    return parsed;
  }
});