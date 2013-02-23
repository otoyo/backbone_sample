/**
 * ContentView
 * 
 * author: Hiroki Toyokawa
 * created at: 2013-02-17
 */
var ContentView = Backbone.View.extend({
  el: "div#content",
  events: {
    "click .nav-items": "clickedNavItems"
  },
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.model.fetch();
  },
  clickedNavItems: function(e) {
    var target = e.currentTarget;
    
    var index = $(target).parent().children('li').index($(target));
    var pref;
    
    switch(index) {
      case 0:
        pref = 13;
        break;
      case 1:
        pref = 27;
        break;
    }
    
    if (pref && pref != this.model.get("pref")) {
      this.model.set({"pref": pref}, {silent: true});
      this.model.fetch();
      
      $(target).parent().children().removeClass("active");
      $(target).addClass("active");
    }
  },
  render: function() {
    var weekly = this.model.get("info");
    var html = "";
    
    _.each(weekly, function(daily) {
      var date = daily.date.replace(/^([0-9]{4})\/([0-9]{2})\/([0-9]{2})/, function(whole, s1, s2, s3){
        return parseInt(s2, 10) + "/" + parseInt(s3, 10);
      });
      
      var icon;
      
      if (daily.weather.indexOf("晴れ", 0) >= 0) {
        if (daily.weather.indexOf("雪", 0) >= 0) {
          icon = "lib/yr_icons/08d.png";
        } else if (daily.weather.indexOf("雨", 0) >= 0) {
          icon = "lib/yr_icons/05d.png";
        } else if (daily.weather.indexOf("くもり", 0) >= 0) {
          icon = "lib/yr_icons/03d.png";
        } else {
          icon = "lib/yr_icons/01d.png";
        }
      } else if (daily.weather.indexOf("雪", 0) >= 0) {
        icon = "lib/yr_icons/13.png";
      } else if (daily.weather.indexOf("雨", 0) >= 0) {
        icon = "lib/yr_icons/09.png";
      } else if (daily.weather.indexOf("くもり", 0) >= 0) {
        icon = "lib/yr_icons/04.png";
      }
      
      var rainfallchance = _.max(daily.rainfallchance.period, function(period){
        return parseInt(period.content, 10);
      }).content;
      
      var temperatureMax = daily.temperature.range[0].content;
      var temperatureMin = daily.temperature.range[1].content;
      
      var params = {
        date: date,
        icon: icon,
        rainfallchance: rainfallchance,
        temperatureMax: temperatureMax,
        temperatureMin: temperatureMin
      };
      
      html += _.template($('#daily-template').html(), params);
    });
    
    $(this.el).children("ul#weekly").empty().html(html);
    $(this.el).children("ul#weekly").children().slideDown()
  }
});