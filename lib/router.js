FlowRouter.route("/", {
  name: "home",
  action: function() {
    BlazeLayout.render("mainLayout", { main: "home" });
  }
});

FlowRouter.route("/new", {
  name: "new",
  action: function() {
    BlazeLayout.render("mainLayout", { main: "newMovieForm", top: "colorField" });
  }
});