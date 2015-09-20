Movies = new Mongo.Collection("movies");

if (Meteor.isClient) {
  // // counter starts at 0
  // Session.setDefault('counter', 0);
  $(".colorField").hide();

  Template.home.helpers({
    movies: function() {
      var searchTerm = Session.get("searchTerm");
      if (searchTerm) {
        return Movies.find({title: new RegExp(searchTerm) });
      } else {
        return Movies.find({});
      };
    }
  });

  Template.mainLayout.events({
    "click button": function(e) {
      e.preventDefault();

      var $el = $(e.target),
          route = $el.attr("href"),
          show = $el.attr("show"),
          form = $el.attr("form");

      if (route) {
        FlowRouter.go(route);
      } else if (show) {
        $(show).show();
        $el.hide();
      } else if (form) {
        $(form).trigger("submit");
      };
    },

    "keyup #search": function(e) {
      Session.set("searchTerm", e.target.value);
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
