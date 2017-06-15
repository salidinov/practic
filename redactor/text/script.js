/**
 * Created with JetBrains WebStorm.
 * User: Алексей
 * Date: 16.01.14
 * Time: 14:50
 * To change this template use File | Settings | File Templates.
 */
$(function() {
  $("#textEditor").attr("contentEditable", "true");
  $("#textEditor").addClass("en");


  $("#btnToogle").click(function(){
      if( $("#textEditor").attr("contentEditable") === "true" ) {
          $("#btnToogle").html("Enable");
          $("#textEditor").attr("contentEditable", "false");
          $("#textEditor").removeClass("en");
          $("#textEditor").addClass("dis");
      } else {
          $("#btnToogle").html("Disable");
          $("#textEditor").attr("contentEditable", "true");
          $("#textEditor").removeClass("dis");
          $("#textEditor").addClass("en");
      }

  });
    $("#btnRemove").click(function() {
        $("#textEditor").html("");
    });
    $("#btnCapitalize").click(function() {
       $("#textEditor").html($("#textEditor").text().toUpperCase());
    });
    $("#btnSmall").click(function() {
        $("#textEditor").html($("#textEditor").text().toLowerCase());
    });
    $("#btnUnder").click(function() {
        $("#textEditor").toggleClass("under");
    });
    $("#btnBold").click(function() {
        $("#textEditor").toggleClass("bold");
    });
});
