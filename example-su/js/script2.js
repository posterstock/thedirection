$( document ).ready(function() {
    $("#fb_btn").click(
		function(){
			ym(48986183, 'getClientID', function(clientID) {
			  $("#fb_ymcid").val(clientID);
			});
			reachGoal('maintext');
			$("#fb_type").val(0);
			var OK = true;
			var $fb_e = $("#fb_email");
			var $fb_m = $("#fb_message");
			var eml = $fb_e.val();
			var $gFormInput_e = $fb_e.parents('.g__form-input');
			var $gFormInput_m = $fb_m.parents('.g__form-input');
			if( eml=="" ) {
				$gFormInput_e.removeClass('verified');
				$("#fb_email_err").text("Поле не заполнено");
				$gFormInput_e.addClass('error');
				OK = false;
			}
			if( OK && eml.indexOf("@", 1) < 0 && eml.indexOf(".", 2) < 0 ) {
				$gFormInput_e.removeClass('verified');
				$("#fb_email_err").text("Поле заполнено некорректно");
				$gFormInput_e.addClass('error');
				OK = false;
			}
			if( OK ) {
				$gFormInput_e.removeClass('error');
				$gFormInput_e.addClass('verified');
			}
			if( $fb_m.val()=="" ) {
				$gFormInput_m.removeClass('verified');
				$gFormInput_m.addClass('error');
				OK = false;
			}
			else {
				$gFormInput_m.removeClass('error');
				$gFormInput_m.addClass('verified');
			}
			if( OK )
				sendFbForm();
			return false; 
		}
	);
    $("#cb_btn").click(
		function(){
			choose();
			ym(48986183, 'getClientID', function(clientID) {
			  $("#fb_ymcid").val(clientID);
			});
			reachGoal('telephonedown');
			$("#fb_type").val(1);
			var OK = true;
			var $cb_n = $("#cb_name");
			var $cb_t = $("#form_pop_up_tel_input_object");
			var $gFormInput_n = $cb_n.parents('.g__form-input');
			var $gFormInput_t = $cb_t.parents('.g__form-input');
			
			if( $cb_n.val()=="" ) {
				$gFormInput_n.removeClass('verified');
				$gFormInput_n.addClass('error');
				OK = false;
			}
			else {
				$gFormInput_n.removeClass('error');
				$gFormInput_n.addClass('verified');
			}
			if( $cb_t.val().length < 10 ) {
				$gFormInput_t.removeClass('verified');
				$gFormInput_t.addClass('error');
				OK = false;
			}
			else {
				$gFormInput_t.removeClass('error');
				$gFormInput_t.addClass('verified');
			}
			if( OK )
				sendCbForm();
			return false; 
		}
	);
    $("#sw_btn").click(
		function(){
			choose2();
			ym(48986183, 'getClientID', function(clientID) {
			  $("#fb_ymcid").val(clientID);
			});
			reachGoal('korobkabuy');
			$("#fb_type").val(2);
			var OK = true;
			var $cb_n = $("#sw_name");
			var $cb_t = $("#form_pop_up2_tel_input_object");
			var $gFormInput_n = $cb_n.parents('.g__form-input');
			var $gFormInput_t = $cb_t.parents('.g__form-input');
			
			if( $cb_n.val()=="" ) {
				$gFormInput_n.removeClass('verified');
				$gFormInput_n.addClass('error');
				OK = false;
			}
			else {
				$gFormInput_n.removeClass('error');
				$gFormInput_n.addClass('verified');
			}
			if( $cb_t.val().length < 10 ) {
				$gFormInput_t.removeClass('verified');
				$gFormInput_t.addClass('error');
				OK = false;
			}
			else {
				$gFormInput_t.removeClass('error');
				$gFormInput_t.addClass('verified');
			}
			if( OK )
				sendSwForm();
			return false; 
		}
	);
});
 
function sendFbForm() {
    jQuery.ajax({
        url:     "/processing/fb_form_get.php",
        type:     "POST",
        dataType: "html",
        data: jQuery("#fb_form").serialize(),
        success: function(response) {
			if( response=="OK" ) {
				document.getElementById("fb_title").innerHTML = "Ваше сообщение <br/>отправлено.";
				document.getElementById("fb_subtitle").innerHTML = document.getElementById("fb_subtitle2").innerHTML;
				var $fb_e = $("#fb_email");
				$fb_e.val("");
				var $gFormInput_e = $fb_e.parents('.g__form-input');
				$gFormInput_e.removeClass('verified');
				var $fb_m = $("#fb_message");
				$fb_m.val("");
				var $gFormInput_m = $fb_m.parents('.g__form-input');
				$gFormInput_m.removeClass('verified');
			}
			else {
				console.log(response);
				document.getElementById("fb_title").innerHTML = "Ошибка! Сообщение<br/>не отправлено.";
				document.getElementById("fb_subtitle").innerHTML = "Пожалуйста, повторите еще раз.";
			}
    	},
    	error: function(response) {
			console.log(response);
    		document.getElementById("fb_title").innerHTML = "Ошибка! Сообщение<br/>не отправлено.";
    		document.getElementById("fb_subtitle").innerHTML = "Пожалуйста, повторите еще раз.";
    	}
 	});
}

function sendCbForm() {
    jQuery.ajax({
        url:     "/processing/fb_form_get.php",
        type:     "POST",
        dataType: "html",
        data: jQuery("#fb_form").serialize(),
        success: function(response) {
			if( response=="OK" ) {
				document.getElementById("cb_fields").innerHTML = "<div class='g__text type-h4 g__color-dark el-title'>Ваше сообщение успешно отправлено.</div>";
			}
			else {
				console.log(response);
				document.getElementById("cb_anonce").innerHTML = "<b>Ошибка! Сообщение не отправлено.<br/>Пожалуйста, повторите еще раз.</b>";
			}
    	},
    	error: function(response) {
			console.log(response);
			document.getElementById("cb_anonce").innerHTML = "<b>Ошибка! Сообщение не отправлено.<br/>Пожалуйста, повторите еще раз.</b>";
    	}
	});
}

function sendSwForm() {
    jQuery.ajax({
        url:     "/processing/fb_form_get.php",
        type:     "POST",
        dataType: "html",
        data: jQuery("#fb_form").serialize(),
        success: function(response) {
			if( response=="OK" ) {
				document.getElementById("sw_fields").innerHTML = "<div class='g__text type-h4 g__color-dark el-title'>Ваше сообщение успешно отправлено.</div>";
			}
			else {
				console.log(response);
				document.getElementById("sw_anonce").innerHTML = "<b>Ошибка! Сообщение не отправлено.<br/>Пожалуйста, повторите еще раз.</b>";
			}
    	},
    	error: function(response) {
			console.log(response);
			document.getElementById("sw_anonce").innerHTML = "<b>Ошибка! Сообщение не отправлено.<br/>Пожалуйста, повторите еще раз.</b>";
    	}
	});
}

function reachGoal(goalType) {
	ym(48986183, 'reachGoal', goalType);
	var dt = {};
	dt["goal"] = goalType;
	ym(48986183, 'getClientID', function(clientID) {
		dt["ymcid"] = clientID;
	});
	
    jQuery.ajax({
        url:     "/processing/goals_get.php",
        type:     "POST",
        dataType: "html",
        data: dt,
        success: function(response) {
			if( response!="OK" ) {
				console.log(response);
			}
    	},
    	error: function(response) {
			console.log(response);
    	}
	});
}

var mntHours = 2;
var corpLcns = 2;
var bdType = [" тип.", " нем.", " сущ."];
var mtrrtrf = ["0", "2", "5", "10"];
var licListCr = ["КИП8", "Серв.", "1рм", "5рм", "10рм", "20рм", "50рм", "100рм", "300рм", "500рм", "1000рм"];
var licListCl = ["Мини5", "Серв.", "Серв64.", "1рм", "5рм", "10рм", "20рм", "50рм", "100рм", "300рм", "500рм"];

function setAddLic() {
	var $licType = $("#licType");
	if( $licType.length > 0 ) {
		var rd = $('input[name="name_2_1"]');
		rd.eq(2).prop('checked', true);
	}
}
function setExpHour(buttId) {
	if( buttId=="regExp2" || buttId=="regExp5" || buttId=="regExp10" ) {
		var rd = $('input[name="name_5"]');
		rd.eq(1).prop('checked', true);
	}
}

function calculate() {
	var $fb_constr = $("#fb_constr");

	// /services/its/
	var $itssum = $("#itssum");
	if( $itssum.length > 0 ) {
		var $agris = $("#agris");
		var $plan1c = $("#plan1c");
		var $agr3m = $("#agr3m");
		var $agr6m = $("#agr6m");
		var $agr1y = $("#agr1y");
		var $itstime = $("#itstime");
		var $blocker = $("#blocker");
		if( $plan1c.hasClass('active') ) {
			$itssum.text("22 544 ₽");
			$itstime.text("Total cost per year");
			$blocker.show();
			if( !$agr1y.hasClass('active') ) {
				$agr3m.removeClass('active');
				$agr6m.removeClass('active');
				$agr1y.addClass('active');
				$agr1y.find('input').prop("checked", true);
			}
		}
		else {
			$blocker.hide();
			if( $agris.hasClass('active') ) {
				if( $agr3m.hasClass('active') ) {
					$itssum.text("9 156 ₽");
					$itstime.text("Итоговая стоимость за 3 месяца");
				}
				if( $agr6m.hasClass('active') ) {
					$itssum.text("17 670 ₽");
					$itstime.text("Итоговая стоимость за 6 месяцев");
				}
				if( $agr1y.hasClass('active') ) {
					$itssum.text("33 816 ₽");
					$itstime.text("Total cost per year");
				}
			}
			else {
				if( $agr3m.hasClass('active') ) {
					$itssum.text("10 986 ₽");
					$itstime.text("Итоговая стоимость за 3 месяца");
				}
				if( $agr6m.hasClass('active') ) {
					$itssum.text("21 204 ₽");
					$itstime.text("Итоговая стоимость за 6 месяцев");
				}
				if( $agr1y.hasClass('active') ) {
					$itssum.text("40 572 ₽");
					$itstime.text("Total cost per year");
				}
			}
		}
		var its = "ИТС: " + ($agris.hasClass('active') ? "есть" : "нету");
		var box = " / Покупка: " + ($plan1c.hasClass('active') ? "да" : "нет");
		var trm = " / Срок: " + ($agr3m.hasClass('active') ? "3мес" : ($agr6m.hasClass('active') ? "6мес" : "год"));
		$fb_constr.val(its + box + trm);
	}
	
	// /services/its/fresh/
	var $freshsum = $("#freshsum");
	if( $freshsum.length > 0 ) {
		var $frshis = $("#frshis");
		var $trBase = $("#trBase");
		var $trProf = $("#trProf");
		var $trCorp = $("#trCorp");
		var $frsh3m = $("#frsh3m");
		var $frsh6m = $("#frsh6m");
		var $frsh1y = $("#frsh1y");
		var $frshtime = $("#freshtime");
		var $blocker = $("#blocker");
		var strf = "";
		var strm = "";
		if( $trBase.hasClass('active') ) {
			$blocker.show();
			strf = "базовый";
			if( $frsh3m.hasClass('active') ) {
				$freshsum.text("6 808 ₽");
				$frshtime.text("Total cost per 6 months");
				$frsh3m.removeClass('active');
				$frsh6m.addClass('active');
				$frsh6m.find('input').prop("checked", true);
				strm = "6мес.";
			}
			if( $frsh6m.hasClass('active') ) {
				$freshsum.text("6 808 ₽");
				$frshtime.text("Total cost per 6 months");
				strm = "6мес.";
			}
			if( $frsh1y.hasClass('active') ) {
				$freshsum.text("13 029 ₽");
				$frshtime.text("Total cost per year");
				strm = "1год";
			}
		}
		else {
			$blocker.hide();
			if( $trProf.hasClass('active') ) {
				strf = "ПРОФ,СПЕЦ";
				if( $frsh3m.hasClass('active') ) {
					$freshsum.text("9 156 ₽");
					$frshtime.text("Итоговая стоимость за 3 месяца");
					strm = "3мес.";
				}
				if( $frsh6m.hasClass('active') ) {
					$freshsum.text("17 670 ₽");
					$frshtime.text("Total cost per 6 months");
					strm = "6мес.";
				}
				if( $frsh1y.hasClass('active') ) {
					$freshsum.text("33 816 ₽");
					$frshtime.text("Total cost per year");
					strm = "1год";
				}
			}
			else {
				strf = "КОРП";
				if( $frsh3m.hasClass('active') ) {
					$freshsum.text("18 310 ₽");
					$frshtime.text("Итоговая стоимость за 3 месяца");
					strm = "3мес.";
				}
				if( $frsh6m.hasClass('active') ) {
					$freshsum.text("35 335 ₽");
					$frshtime.text("Total cost per 6 months");
					strm = "6мес.";
				}
				if( $frsh1y.hasClass('active') ) {
					$freshsum.text("67 633 ₽");
					$frshtime.text("Total cost per year");
					strm = "1год";
				}
			}
		}
		$fb_constr.val("Тариф: " + strf + " / Срок: " + strm);
	}
	
	// /services/maintenance/
	var $hoursNDS = $("#hoursNDS");
	if( $hoursNDS.length > 0 ) {

        // почасовка		
		var hrCost = mthr[$hoursNDS.hasClass('active') ? 1 : 0][mntHours];
		$("#hourCost").val(hrCost.toLocaleString());
		$("#hbtNDS").html($hoursNDS.hasClass('active') ? "Total cost per year with VAT" : "Total cost per year without VAT");
		$("#hbtPrice").text(hrCost.toLocaleString() + " $");
		$("#hbtQuant").text(mntHours + (mntHours < 5 ? " hous" : " hours"));
		var sum = mntHours * hrCost;
		$("#hbtCost").text(sum.toLocaleString() + " $");
		
		// регулярка
		var regITS = $("#regITS").hasClass('active') ? 1 : 0;
		var regDB = 0;
		if( $("#regDB").hasClass('active') ) {
		    regDB = $("#regDB1").hasClass('active') ? 1 : ( $("#regDB2").hasClass('active') ? 2 : ( $("#regDB3").hasClass('active') ? 3 : ( $("#regDB4").hasClass('active') ? 4 : 5 ) ) );
		}
		var regDBt = $("#regDBt").hasClass('active') ? 0 : ( $("#regDBn").hasClass('active') ? 1 : 2 );
		var regExp = $("#regExp0").prop("checked") ? 0 : ( $("#regExp2").hasClass('active') ? 1 : ( $("#regExp5").hasClass('active') ? 2 : 3 ) );
		$("#regExpList").css("opacity", ($("#regExp0").prop("checked") ? "0.3" : "1"));
		var regSrv1 = $("#regSrv1").hasClass('active') ? 1 : 0;
		var regSrv2 = $("#regSrv2").hasClass('active') ? 1 : 0;
		var regSrv3 = $("#regSrv3").hasClass('active') ? 1 : 0;
		var regSrv4 = $("#regSrv4").hasClass('active') ? 1 : 0;
		var regSrv5 = $("#regSrv5").hasClass('active') ? 1 : 0;
		var regSrv6 = $("#regSrv6").hasClass('active') ? 1 : 0;
		var regSrv7 = $("#regSrv7").hasClass('active') ? 1 : 0;
		var regSrv8 = $("#regSrv8").hasClass('active') ? 1 : 0;
		var regTrm = $("#regTrm3").hasClass('active') ? 3 : ( $("#regTrm6").hasClass('active') ? 6 : 12 );
		var regNDS = $("#regNDS").hasClass('active') ? 1 : 0;
		for( var i = 0; i < mtrr.length; i++ ) {
		    var mtr = mtrr[i];
		    if( mtr.term==regTrm && mtr.nds==regNDS ) {
		        var pr = mtr.its[regITS] + mtr.db[regDB][regDBt] + mtr.exp[regExp];
		        if( regSrv6==1 ) pr += mtrrsrv.spark;
		        if( regSrv7==1 ) pr += mtrrsrv.sparkpl;
		        var ot = regDBt==2 || regDB==5 ? "from " : "";
		        $("#rbtCost").html(ot + "<span>" +  pr.toLocaleString() + " $</span>");
		        var prm = Math.round(pr / regTrm);
		        $("#rbtPrice").html(ot + prm.toLocaleString() + " $");
		        $("#rbtTariff").text("ИТС+" + mtrrtrf[regExp]);
		        var prh = mtr.dbh[regDB][regDBt] < mtr.exph[regExp] ? mtr.dbh[regDB][regDBt] : mtr.exph[regExp];
		        $("#rbtAdd").html(prh.toLocaleString() + " $");
		        
		        break;
		    }
		}
		$("#rbtNDS").html("Total cost " + ($("#regTrm3").hasClass('active') ? "per 3 months" : ( $("#regTrm6").hasClass('active') ? "per 6 months" : "per year" )) + (regNDS==1 ? " with VAT" : " without VAT"));
		var its = "Рег: ИТС: " + (regITS==1 ? "есть" : "нету");
		var bdt = " / БД: " + regDB + bdType[regDBt];
		var cns = " / Консультации: " + mtrrtrf[regExp];
		var srv = " / Сервисы: " + (regSrv1 ? "Отч." : "") + (regSrv2 ? "Контр." : "") + (regSrv3 ? "ЭДО " : "") + (regSrv4 ? "ИТС " : "") + (regSrv5 ? "Ауд." : "") + (regSrv6 ? "Спарк." : "") + (regSrv7 ? "Спарк+ " : "") + (regSrv8 ? "Фреш " : "");
		var trm = " / Срок: " + regTrm + "мес.";
		var nds = " / НДС: " + (regNDS==1 ? "да" : "нет");
		var hrs = " / Почас: Часы: " + mntHours
		var nds2 = " / НДС: " + ($hoursNDS.hasClass('active') ? "да" : "нет");
		$fb_constr.val(its + bdt + cns + srv + trm + nds + hrs + nds2);
	}
	
	// /services/maintenance/line/
	var $lineNDS = $("#lineNDS");
	if( $lineNDS.length > 0 ) {
		var hrCost = mthr[$lineNDS.hasClass('active') ? 1 : 0][mntHours];
		$("#hourCost").val(hrCost.toLocaleString());
		var hrs = "Часы: " + mntHours
		var nds = " / НДС: " + ($lineNDS.hasClass('active') ? "да" : "нет");
		$fb_constr.val(hrs + nds);
	}
	
	// /projects/corporative/
	var $corpNDS = $("#corpNDS");
	var $corpPay = $("#corpPay");
	if( $corpNDS.length > 0 ) {
		var cNDS = $corpNDS.hasClass('active') ? 1 : 0;
		var cPay = $corpPay.hasClass('active') ? 0 : 2;
		var hrCost = crhr[cNDS + cPay][mntHours];
		$("#corpCost").text(hrCost.toLocaleString() + " ₽");
		var hrs = "Часы: " + (mntHours * 5 + 10);
		var nds = " / НДС: " + ($corpNDS.hasClass('active') ? "да" : "нет");
		var pay = " / " + ($corpPay.hasClass('active') ? "Предоплата" : "Постоплата");
		$fb_constr.val(hrs + nds + pay);
	}

	// /software/licences_corp/
	var $licType = $("#licType");
	if( $licType.length > 0 ) {
		var licKind = parseInt($('input[name=name_2_1]:checked').val());
		if( licKind==2 ) licKind = corpLcns;
		if( !$licType.hasClass('active') && (licKind==0 || licKind==10) ) $licType.addClass('active');
		var licUSB = $licType.hasClass('active') ? 0 : 1;
		var lcCost = crpl[licUSB][licKind];
		$("#licCost").text(lcCost.toLocaleString() + " ₽");
		$fb_constr.val("Лицензии: " + licListCr[licKind] + " / Защита: " + (licUSB==0 ? "USB" : "Прогр."));
	}

	// /software/licences/
	var $licType = $("#defType");
	if( $licType.length > 0 ) {
		var licKind = parseInt($('input[name=name_2_1]:checked').val());
		if( licKind==3 ) licKind = corpLcns + 1;
		if( !$licType.hasClass('active') && (licKind==0) ) $licType.addClass('active');
		var licUSB = $licType.hasClass('active') ? 0 : 1;
		var lcCost = clnl[licUSB][licKind];
		$("#licCost").text(lcCost.toLocaleString() + " ₽");
		var giftHr = clnh[licKind];
		$("#giftHours").html(clnh[licKind] + " <b>в подарок</b>");
		$fb_constr.val("Лицензии: " + licListCl[licKind] + " / Защита: " + (licUSB==0 ? "USB" : "Прогр."));
	}
}

function choose() {
	var cbtime = $('input[name=name_1]:checked').val();
	if( cbtime=="1" )
		cbtime = $('input[name=name_2]:checked').val();
	$("#fb_cbtime").val(cbtime);
	$("#fb_name").val($("#cb_name").val());
	$("#fb_phone").val($("#form_pop_up_tel_input_object").val());
	
}

function choose2() {
	$("#fb_name").val($("#sw_name").val());
	$("#fb_phone").val($("#form_pop_up2_tel_input_object").val());
	
}


