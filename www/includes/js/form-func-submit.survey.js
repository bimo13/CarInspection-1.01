function submitSurveyBaru(){
	
	var lv				=	GetURLParameter("lv");
	
	if(typeof(lv) != "undefined" && lv !== null){
		
		var survey_id			=	GetURLParameter("id");
		window.location.href	=	"form-surveyPhoto.html?lv=terjadwal&dir="+survey_id;
		
	}else{
		
		$("#pleasewait").modal();
		
		//Data Customer
		var cust_nama		=	$("#cust_nama").val();
		var cust_addr		=	$("#cust_addr").val();
		var cust_kota		=	$("#cust_kota").val();
		var cust_zipc		=	$("#cust_zipc").val();
		var cust_telp		=	$("#cust_telp").val();
		var cust_cell		=	$("#cust_cell").val();
		var cust_mail		=	$("#cust_mail").val();
		var cust_incm		=	$("#cust_incm").val();
		var cust_fsrc		=	$("#cust_fsrc").val();
		
		//Data Kendaraan
		var kend_merk		=	$("#kend_merk").val();
		var kend_seri		=	$("#kend_seri").val();
		var kend_gear		=	$("#kend_gear").val();
		var kend_year		=	$("#kend_year").val();
		var kend_npol		=	$("#kend_npol").val();
		var kend_nrgk		=	$("#kend_nrgk").val();
		var kend_nmes		=	$("#kend_nmes").val();
		var kend_guna		=	$("#kend_guna").val();
		var kend_rfnd		=	$("#kend_afnd").val();
		
		if($("#insc_prod").val() == "all"){
			var prod_all	=	"y";
			var prod_tlo	=	"n";
		}else{
			var prod_all	=	"n";
			var prod_tlo	=	"y";
		}
		
		//Data Jaminan
		if($("#grt_sts").is(':checked'))
			var grt_sts		=	"y";
		else
			var grt_sts		=	"n";
		
		if($("#grt_bda").is(':checked'))
			var grt_bda		=	"y";
		else
			var grt_bda		=	"n";
		
		if($("#grt_aog").is(':checked'))
			var grt_aog		=	"y";
		else
			var grt_aog		=	"n";
		
		if($("#grt_tjh").is(':checked'))
			var grt_tjh		=	"y";
		else
			var grt_tjh		=	"n";
		
		if($("#grt_psa").is(':checked'))
			var grt_psa		=	"y";
		else
			var grt_psa		=	"n";
		
		if($("#grt_mdx").is(':checked'))
			var grt_mdx		=	"y";
		else
			var grt_mdx		=	"n";
		
		$.post(
			"http://carsurvey.totalit.co.id/bimo/web-service/submit-surveyBaru.php",
			{
				cust_nama: cust_nama,
				cust_addr: cust_addr,
				cust_kota: cust_kota,
				cust_zipc: cust_zipc,
				cust_telp: cust_telp,
				cust_cell: cust_cell,
				cust_mail: cust_mail,
				cust_incm: cust_incm,
				cust_fsrc: cust_fsrc,
				kend_merk: kend_merk,
				kend_seri: kend_seri,
				kend_gear: kend_gear,
				kend_year: kend_year,
				kend_npol: kend_npol,
				kend_nrgk: kend_nrgk,
				kend_nmes: kend_nmes,
				kend_guna: kend_guna,
				kend_rfnd: kend_rfnd,
				prod_all: prod_all,
				prod_tlo: prod_tlo,
				grt_sts: grt_sts,
				grt_bda: grt_bda,
				grt_aog: grt_aog,
				grt_tjh: grt_tjh,
				grt_psa: grt_psa,
				grt_mdx: grt_mdx
			},
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
					});
					
					$("#button-DialogYes").addClass("hide");
					$("#button-DialogNo").addClass("hide");
					
					$("#pleasewait").modal("hide");
					$("#AppDialogs").modal();
				}else{
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
						fileSystem.root.getDirectory("TotalIT.CarSurvey",{create: true, exclusive: false})
					});
					
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
						fileSystem.root.getDirectory("TotalIT.CarSurvey/Survey.Baru",{create: true, exclusive: false})
					});
					
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
						fileSystem.root.getDirectory("TotalIT.CarSurvey/Survey.Baru/Survey-"+data['return_data'],{create: true, exclusive: false})
					});
					
					window.location.href = "form-surveyPhoto.html?lv=baru&dir="+data['return_data'];
				}
			},
			"json"
		);
		
	}
	
}