if (Meteor.isClient) {

  function getHexColor(e) {
    var $doc = $(document);
    var h = (e.pageX / $doc.width()) * 360;
    var s = e.pageY / $doc.height();
    var l = 0.5;
    return tinycolor({ h: h, s: s, l: l }).toHexString();
  }

  Template.colorField.events({
    // "click button": function(e) {
    //   $(".colorField").hide();
    // },

    "mousemove": function(e) {
      if(e.target !== $("form")[0] && e.buttons > 0) {
        var hex = getHexColor(e);
        $(".colorField").css("background-color", hex);
        $("input[name=hexColor]").val(hex);

        // var readableOptions = ["#d3d3d3", "#708090", "#778899", "#808080", "#696969", "#a9a9a9", "#2f4f4f"]
        var readableOptions = ["#000", "#555", "#bbb", "#fff"];
        var readableColor = tinycolor.mostReadable(hex, readableOptions).toHexString();
        $("*").css("color", readableColor);
        $("*").css("border-color", readableColor);
      }
    }
  });

}