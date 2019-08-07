$(".searchButton").on("click",function(){
  	$(".searchTerm").toggleClass("inclicked");
  	$(".searchButton").toggleClass("close");
  	$("#SID").focus();
});

  $(document).ready(function(){
   $(".searchButton").click();
  });

  if ( window.history.replaceState ) {
  	window.history.replaceState( null, null, window.location.href );
  };