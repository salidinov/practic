 
 $(document).ready(function(){
    $("#redactor").attr("contentEditable", "true");
 
    $('#redactor').focus(function(){
        $('#redactor').css('outline-color','#FF0000');
    });
		
	$('#reset').click(function(){
	    $("#redactor").html("");
	});	
	
	$('#btnB').click(function(){
	   $('#redactor').toggleClass('bold');
	});	
	
	$('#btnI').click(function(){
	   $('#redactor').toggleClass('italic');
	});		
	
	$('#btnU').click(function(){
	   $('#redactor').toggleClass('underline');
	});	
   
	$('#alignLeft').click(function(){
	   $('#redactor').css('text-align','left');
	});	

	$('#alignCenter').click(function(){
	   $('#redactor').css('text-align','center');
	    
	});	

	$('#alignRight').click(function(){
	   $('#redactor').css('text-align','right');
	});	
	
	$('.pull-me').click(function(){
        $('.panel').slideToggle('slow');
        });
	});