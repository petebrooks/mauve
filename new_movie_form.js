if (Meteor.isClient) {

  Template.newMovieForm.events({
    "submit": function(e) {
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

    "keypress": function(e) {
      var $el = $(e.target);
      var complete = $el.val().trim();
      complete ? $el.removeClass("error") : $el.addClass("error");
    }
  })
}