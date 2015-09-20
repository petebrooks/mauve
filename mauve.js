Movies = new Mongo.Collection("movies");

if (Meteor.isClient) {
  // // counter starts at 0
  // Session.setDefault('counter', 0);

  function getHexColor(e) {
    var $el = $(e.target)
    var h = (e.pageX / $el.width()) * 360;
    var s = e.pageY / $el.height();
    var l = 0.5;
    return tinycolor({ h: h, s: s, l: l }).toHexString();
  }

  Template.body.helpers({
    movies: function() {
      return Movies.find({});
    }
  });

  Template.mov.helpers({
    formatDate: function() {
      return moment(this.createdAt).format('MM/DD/YYYY');
    }
  });

  Template.mov.onRendered( function() {
    var color = tinycolor(this.data.hexColor);
    var $el = $(this.firstNode);
    var backgroundColor = color.toHexString();
    var textColor = tinycolor.mostReadable(color, ["#fff", "#000"]).toHexString();
    $el.css({
      "background-color": backgroundColor,
      "color": textColor
    });
  });

  Template.body.events({
    "mousemove": function(e) {
      if(e.target === $(".color_r")[0] && e.buttons > 0) {
        var hex = getHexColor(e);
        $(".color_r").css("background-color", hex);
        $("input[name=hexColor]").val(hex);
      }
    },

    "submit .new-movie": function(e) {
      e.preventDefault();

      var title = e.target.title.value.trim();
      var hexColor = e.target.hexColor.value.trim() || "#ffffff";

      if (title) {
        Movies.insert({
          title: title,
          hexColor: hexColor,
          createdAt: new Date()
        });

        e.target.title.value = "";
      };
    },

    "keypress .new-movie": function(e) {
      var $el = $(e.target);
      var complete = $el.val().trim();
      complete ? $el.removeClass("error") : $el.addClass("error");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
