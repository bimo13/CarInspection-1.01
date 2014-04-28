var lv					=	GetURLParameter("lv");

if(typeof(lv) != "undefined" && lv !== null){
	
	$("#btn-back-list").removeClass("hidden");
	
	var id				=	GetURLParameter("id");
	
	$.post(
		"http://carsurvey.totalit.co.id/web-service/get-surveyDetail.php",
		{ id: id },
		function(data){
			if(data['status'] != 1){
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
			}else{
				$("#cust_nama").val(data['return_data']['cust_name']).attr("readonly",true);
				$("#cust_addr").val(data['return_data']['cust_addr']).attr("readonly",true);
				$("#cust_kota").val(data['return_data']['cust_city']).attr("readonly",true);
				$("#cust_zipc").val(data['return_data']['cust_zipc']).attr("readonly",true);
				$("#cust_telp").val(data['return_data']['cust_telp']).attr("readonly",true);
				$("#cust_cell").val(data['return_data']['cust_cell']).attr("readonly",true);
				$("#cust_mail").val(data['return_data']['cust_mail']).attr("readonly",true);
				$("#cust_incm").val(data['return_data']['cust_incm']).attr("disabled",true);
				$("#cust_fsrc").val(data['return_data']['cust_fsrc']).attr("disabled",true);
				
				$("#kend_merk").val(data['return_data']['kend_merk']).attr("disabled",true);
				$("#kend_seri option:selected").text(data['return_data']['seri_nama']);
				$("#kend_seri").attr("disabled",true);
				$("#kend_gear").val(data['return_data']['kend_gear']).attr("disabled",true);
				$("#kend_year option:selected").text(data['return_data']['kend_year']);
				$("#kend_year").attr("disabled",true);
				$("#kend_npol").val(data['return_data']['kend_npol']).attr("readonly",true);
				$("#kend_nmes").val(data['return_data']['kend_nmes']).attr("readonly",true);
				$("#kend_nrgk").val(data['return_data']['kend_nrgk']).attr("readonly",true);
				$("#kend_guna").val(data['return_data']['kend_guna']).attr("readonly",true);
				$("#kend_rfnd").val(data['return_data']['kend_rfnd']).attr("readonly",true);
				
				if(data['return_data']['prod_all'] == "y")
					$("#prod_all").attr("checked",true).attr("disabled",true);
				else
					$("#prod_all").attr("disabled",true);
				
				if(data['return_data']['prod_tlo'] == "y")
					$("#prod_tlo").attr("checked",true).attr("disabled",true);
				else
					$("#prod_tlo").attr("disabled",true);
				
				if(data['return_data']['prod_sts'] == "y")
					$("#grt_sts").attr("checked",true).attr("disabled",true);
				else
					$("#grt_sts").attr("disabled",true);
				
				if(data['return_data']['prod_bda'] == "y")
					$("#grt_bda").attr("checked",true).attr("disabled",true);
				else
					$("#grt_bda").attr("disabled",true);
				
				if(data['return_data']['prod_aog'] == "y")
					$("#grt_aog").attr("checked",true).attr("disabled",true);
				else
					$("#grt_aog").attr("disabled",true);
				
				if(data['return_data']['prod_tjh'] == "y")
					$("#grt_tjh").attr("checked",true).attr("disabled",true);
				else
					$("#grt_tjh").attr("disabled",true);
				
				if(data['return_data']['prod_psa'] == "y")
					$("#grt_psa").attr("checked",true).attr("disabled",true);
				else
					$("#grt_psa").attr("disabled",true);
				
				if(data['return_data']['prod_mdx'] == "y")
					$("#grt_mdx").attr("checked",true).attr("disabled",true);
				else
					$("#grt_mdx").attr("disabled",true);
				
			}
		},
		"json"
	);
	
}