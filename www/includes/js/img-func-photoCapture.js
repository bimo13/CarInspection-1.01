function capturePhoto(element){
	navigator.camera.getPicture(function(fileSystem) { return onPhotoDataSuccess(fileSystem, element); }, onFail, {
		quality: 100,
		//targetWidth: 3264,
		//targetHeight: 2448,
		//correctOrientation: true,
		destinationType: Camera.DestinationType.FILE_URI
	});
}

function onPhotoDataSuccess(imageURI, element){
	$("#pleasewait").modal();
	element.src = imageURI;
	movePic(imageURI);
}

function onFail(message) {
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-danger\">Alert !</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-danger");
	$("#myDialogsText").html("Proses pengambilan gambar gagal :<br />"+message);
	
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
	
	$("#AppDialogs").modal();
}

function movePic(file){ 
	window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
}

function resolveOnSuccess(entry){ 
	var d = new Date();
	var n = d.getTime();
	
	var newFileName = n + ".jpg";
	
	var lv				=	GetURLParameter("lv");
	var subDir			=	GetURLParameter("dir");
	
	if(lv == "baru")
		mainDir			=	"Survey.Baru";
	else
		mainDir			=	"Survey.Terjadwal";
	
	var myAppFolder 	=	"TotalIT.CarSurvey";
	var myImgMainDir	=	myAppFolder+"/"+mainDir;
	var myImgSubDir		=	myImgMainDir+"/Survey-"+subDir;
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { fileSys.root.getDirectory( myAppFolder, {create:true, exclusive: false}, null, resOnError); }, resOnError );
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { fileSys.root.getDirectory( myImgMainDir, {create:true, exclusive: false}, null, resOnError); }, resOnError );
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { fileSys.root.getDirectory( myImgSubDir, {create:true, exclusive: false}, null, resOnError); }, resOnError );
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { fileSys.root.getDirectory( myImgSubDir, {create:true, exclusive: false}, function(directory) { entry.moveTo(directory, newFileName,  successMove, resOnError); }, resOnError); }, resOnError);
}

/*
function successMove(entry) {
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-success\">Alert !</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-success");
	$("#myDialogsText").html("Gambar telah berhasil disimpan.");
	
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
}
*/

function successMove(entry) {
	$("#pleasewait").modal("hide");
}

function resOnError(error) {
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-danger\">Alert !</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-danger");
	$("#myDialogsText").html("Proses pengambilan gambar gagal :<br />"+error.code);
	
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
}