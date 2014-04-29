function getDataSeries(idmerk){
	
	if(idmerk != "-"){
		
		$("#pleasewait").modal();
		$.post(
			"http://carsurvey.totalit.co.id/bimo/web-service/get-dataSeries.php",
			{ idmerk: idmerk },
			function(data){
				if(data['status'] == 1){
					$("#pleasewait").modal("hide");
					$("#kend_seri").empty();
					$("#kend_seri").append($('<option></option>').val("-").text("- Pilih Satu -"));
					for(var x=0; x<data['return_data'].length; x++){
						$('#kend_seri').append($('<option></option>').val(data['return_data'][x].seri_desc).text(data['return_data'][x].seri_desc));
					}
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
		$("#kend_seri").empty();
		$("#kend_seri").append($('<option></option>').val("-").text("- Pilih Satu -"));
		$("#kend_year").empty();
		$("#kend_year").append($('<option></option>').val("-").text("- Pilih Satu -"));
		$("#kend_afnd").val("");
		$("#kend_rfnd").val("");
		$("#pleasewait").modal("hide");
	}
	
}