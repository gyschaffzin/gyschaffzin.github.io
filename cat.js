$(document).ready(function() {

 $("#content").fadeOut();

 setTimeout(function(){
 	$("#content").text("is dooooooooooooooooope");
 }, 400);
 
 $("#content").fadeIn();

 $("#background").mouseenter(function(){
 	$(this).css("border", "solid 2px #990033");
 });

 $("#background").mouseleave(function(){
 	$(this).css("border", "none");
 });

});

