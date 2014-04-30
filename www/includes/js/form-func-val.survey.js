$('#form-survey').validate({
	rules: {
		cust_prov: { selectcheck: true },
		cust_kota: { selectcheck: true },
		cust_incm: { selectcheck: true },
		cust_fsrc: { selectcheck: true },
		kend_merk: { selectcheck: true },
		kend_seri: { selectcheck: true },
		kend_gear: { selectcheck: true },
		kend_year: { selectcheck: true },
		kend_guna: { selectcheck: true },
		insc_prod: {
			required: true,
			minlength: 1
		}
	},
	messages: {
		insc_prod: {
			required: "Setidaknya salah satu opsi harus dipilih."
		}
	},
	highlight: function(element) {
		$(element).closest('.form-group').addClass('has-error');
	},
	unhighlight: function(element) {
		$(element).closest('.form-group').removeClass('has-error');
	},
	errorElement: 'span',
	errorClass: 'help-block',
	errorPlacement: function(error, element) {
		if(element.parent('.input-group').length) {
			error.insertAfter(element.parent());
		} else if(element.hasClass('val-checkbox')){
			error.insertAfter(element.parent().parent().parent());
		}else {
			error.insertAfter(element);
		}
	},
	submitHandler: function(form){
		submitSurveyBaru();
	}
});

jQuery.extend(jQuery.validator.messages, { required: "Field wajib diisi." });

jQuery.validator.addMethod('selectcheck', function (value) {
	return (value != '-');
}, "Harap pilih salah satu opsi.");