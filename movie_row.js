if (Meteor.isClient) {

  Template.movieRow.helpers({
    formatDate: function() {
      return moment(this.createdAt).format('MM/DD/YYYY');
    }
  });

  Template.movieRow.onRendered( function() {
    var color = tinycolor(this.data.hexColor);
    var backgroundColor = color.toHexString();
    var textColor = tinycolor.mostReadable(color, ["#fff", "#000"]).toHexString();
    $(this.firstNode).css({
      "background-color": backgroundColor,
      "color": textColor
    });
  });

}