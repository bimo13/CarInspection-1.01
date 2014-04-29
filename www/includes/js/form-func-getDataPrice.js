function getDataPrice(seriyear){
	
	var seridesc	=	$("#kend_seri").find('option:selected').text();
	
	if(seriyear != "-"){
		
		$("#pleasewait").modal();
		
		$.post(
			"http://carsurvey.totalit.co.id/bimo/web-service/get-dataPrice.php",
			{
				seridesc: seridesc,
				seriyear: seriyear
			},
			function(data){
				if(data['status'] == 1){
					$("#pleasewait").modal("hide");
					$("#kend_afnd").val(data['return_data']['a']);
					$("#kend_rfnd").val(data['return_data']['b']);
				}else{
					$("#myDialogs").empty();
					$("#myDialogs").html("<div class=\"text-danger\">Alert !</div>");
					
					$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
					$("#myDialogsText").addClass("alert-danger");
					$("#myDialogsText").html(data['message']);
					
					$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
					$("#button-DialogNo").removeClass("hide");
					$("#button-DialogClose").removeClass("hide");
					
					$("#button-DialogYes").unbind();
					$("#button-DialogNo").unbind();
					$("#button-DialogClose").unbind();
					
					$("#button-DialogClose").bind("click", function(){
						$("#AppDialogs").modal("hide");
						setTimeout(
							function(){
								window.location.href="main-page.html";
							},500
						);
					});
					
					$("#button-DialogYes").addClass("hide");
					$("#button-DialogNo").addClass("hide");
					
					$("#pleasewait").modal("hide");
					$("#AppDialogs").modal();
				}
			},
			"json"
		);
	}else{
		$("#pleasewait").modal();
		$("#kend_afnd").val("");
		$("#kend_rfnd").val("");
		$("#pleasewait").modal("hide");
	}
	
}