$("#ingresso").on("keydown", function(e){
			var k = e.which || e.keyCode; // pega o código do evento
		    if(k == 13){$("#avMilitar").focus();}
		});
		
		$("#avMilitar").on("keydown", function(e){
			var k = e.which || e.keyCode; // pega o código do evento
		    if(k == 13){$("#avCivil").focus();}
		});
		
		$("#avCivil").on("keydown", function(e){
			var k = e.which || e.keyCode; // pega o código do evento
		    if(k == 13){$("#afastamentos").focus();}
		});

		$("#afastamentos").on("keydown", function(e){
			var k = e.which || e.keyCode; // pega o código do evento
		    if(k == 13){$("#dobro").focus();}
		});

		$("#dobro").on("keydown", function(e){
			var k = e.which || e.keyCode; // pega o código do evento
		    if(k == 13){$("#afastamentos2").focus();}
		});
		$("#afastamentos2").on("keydown", function(e){
			var k = e.which || e.keyCode; // pega o código do evento
		    if(k == 13){atualiza();}
		});
	
      // Example starter JavaScript for disabling form submissions if there are invalid fields
      (function() {
        'use strict';

        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');

          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();
	  
		function zeroFill(n){
			return n < 9 ? '0${n}' : '${n}';
		}
	  
		function formatDate(date){
			const d = zeroFill(date.getDate());
			const mo = zeroFill(date.getMonth() + 1);
			const y = zeroFill(date.getFullYear());
			return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
		}
		
		function arredondar(str, casas) {
			//if (str.indexOf(',') != -1) str = str.replace(',', '.');
			if (!casas) casas = 0;
			casas = Math.pow(10, casas);
			str = parseFloat(str) * casas;
			return Math.floor(str) / casas;
		}
		
		var total;
		var diferenca;
		var pedagio;
		var dobro;
		var meses4;
		var inicial;
		var tanos25;
		var tdiferenca;
		var tfaltante;
		var tfaltantepedagio;
		var tfaltantepedagiosoma;
		var meses4dias;
		var tservico;
		var tempodobro;
		var emdobro;
		var foraRegra;
		var data1requisito;
		var data2requisito;
		
		function atualiza(){
			inicial = new Date($("#ingresso").val() + " 00:00");
			var termino = new Date("2021-12-31 00:00");
			diferenca = Math.abs(termino.getTime() - inicial.getTime());
			var dias = Math.ceil(diferenca / (1000 * 3600 * 24));
			var avMilitar = parseInt($("#avMilitar").val());
			if (Number.isNaN(avMilitar)) {
				avMilitar = 0;
			}
			var tempo = Math.abs(dias);
			$("#tempo").val(tempo);
			var avCivil = parseInt($("#avCivil").val());
			if (Number.isNaN(avCivil)) {
				avCivil = 0;
			}
			var afastamentos = parseInt($("#afastamentos").val());
			if (Number.isNaN(afastamentos)) {
				afastamentos = 0;
			}
			var afastamentos2 = parseInt($("#afastamentos2").val());
			if (Number.isNaN(afastamentos2)) {
				afastamentos2 = 0;
			}
			total = tempo + avMilitar + avCivil - afastamentos;
			total2 = tempo + avMilitar + avCivil - afastamentos - afastamentos2;
			$("#total").val(total2);
			
			var trintaAnos = new Date(inicial);
			trintaAnos.setDate(trintaAnos.getDate() + 10958 - avMilitar - avCivil + afastamentos);
			tempodobro = trintaAnos;
			trintaAnosAfastamento2 = new Date(trintaAnos);
			trintaAnosAfastamento2.setDate(trintaAnos.getDate() + afastamentos2);
			foraRegra = new Date(trintaAnosAfastamento2);
			$("#anos30").val(formatDate(trintaAnosAfastamento2));
			
			
			
			diferenca = (10958-total)<0 ? 0 : 10958 - total;
			$("#diferenca").val(diferenca);
			
			pedagio = arredondar((diferenca * 0.17),0);
			pedagio = pedagio < 0 ? 0 : pedagio;
			$("#pedagio").val(pedagio);
			
			dobro = parseInt($("#dobro").val());
			if (Number.isNaN(dobro)) {
				dobro = 0;
			}
			
			var trintaAnos17 = trintaAnos;
			trintaAnos17.setDate(trintaAnos17.getDate() + pedagio );
			$("#anos30com17").val(formatDate(trintaAnos17));
			
			
			var anos25 = new Date($("#ingresso").val() + " 00:00");
			anos25.setDate(anos25.getDate() + 9125 - avMilitar + afastamentos + afastamentos2);
			$("#anos25").val(formatDate(anos25));
			
			tanos25 = new Date($("#ingresso").val() + " 00:00");
			tanos25.setDate(tanos25.getDate() + 9125 - avMilitar + afastamentos + afastamentos2);
			
			tdiferenca = new Date(tanos25);
			tdiferenca.setDate(tdiferenca.getDate()+diferenca);
			
			var dinicio = formatDate(tanos25);
			var dtermino = formatDate(tdiferenca);
			tfaltante = tempoHumano(dinicio,dtermino);
			//console.log("Tempo faltante: "+tfaltante);
			
			var apuratempo = new Date($("#ingresso").val() + " 00:00");
			dinicio = formatDate(apuratempo);
			apuratempo.setDate(apuratempo.getDate()+total);
			dtermino = formatDate(apuratempo);
			tservico = tempoHumano(dinicio,dtermino);
			//console.log("Tempo servico: "+tservico);
			
			// pedágio de 17% por extenso
			var tempopedagio = new Date($("#ingresso").val() + " 00:00");
			dinicio = formatDate(tempopedagio);
			tempopedagio.setDate(tempopedagio.getDate()+pedagio);
			dtermino = formatDate(tempopedagio);
			tfaltantepedagio = tempoHumano(dinicio,dtermino);
			// fim pedágio de 17%
			
			// soma pedágio de 17% por extenso
			tempopedagio = new Date($("#ingresso").val() + " 00:00");
			dinicio = formatDate(tempopedagio);
			tempopedagio.setDate(tempopedagio.getDate()+diferenca+pedagio);
			dtermino = formatDate(tempopedagio);
			tfaltantepedagiosoma = tempoHumano(dinicio,dtermino);
			// fim soma pedágio
			
			var inicial30 = new Date("2022-01-01 00:00");
			var termino30 = trintaAnos; //tanos25;
			var diferenca30 = Math.abs(inicial30.getTime() - termino30.getTime());
			var dias30 = Math.ceil(diferenca30 / (1000 * 3600 * 24));
			
			var anostotal = parseInt($("#diferenca").val()/365);
			anostotal = anostotal < 0 ? 0 : (anostotal < 15 ? anostotal : 15); // checar se é de 5 anos
			
			meses4 = 120 * anostotal;
			$("#faltantes").val(meses4);
			
			// meses faltantes por extenso
			tempopedagio = new Date($("#ingresso").val() + " 00:00");
			dinicio = formatDate(tempopedagio);
			tempopedagio.setDate(tempopedagio.getDate()+meses4);
			dtermino = formatDate(tempopedagio);
			meses4dias = tempoHumano(dinicio,dtermino);
			// fim meses faltantes
			
			var tempomilitar = anos25;
			tempomilitar.setDate(tempomilitar.getDate() + meses4);
			$("#tempomilitar").val(formatDate(tempomilitar));
			
			if(tempomilitar<trintaAnos17) {
				$("#anos30com17").addClass("bg-danger text-white");
				$("#tempomilitar").removeClass("bg-danger text-white");
				
			//	tempodobro.setDate(tempodobro.getDate());
				data1requisito = $("#anos30com17").val();
				data1requisito = data1requisito.split("/");
				data1requisito = new Date(data1requisito[2]+"-"+data1requisito[1]+"-"+data1requisito[0]+" 00:00");
				
				//emdobro = new Date("2022-01-01 00:00");
				//emdobro = trintaAnos17;
				//emdobro.setDate(emdobro.getDate());
				tempodobro = data1requisito.toLocaleDateString();
				data1requisito.setDate(data1requisito.getDate()-dobro);
				emdobro = data1requisito.toLocaleDateString();
				//tempodobro = formatDate(data1requisito) + " op1";
			} else {
				$("#anos30com17").removeClass("bg-danger text-white");
				$("#tempomilitar").addClass("bg-danger text-white");
				
				data2requisito = $("#tempomilitar").val();
				data2requisito = data2requisito.split("/");
				data2requisito = new Date(data2requisito[2]+"-"+data2requisito[1]+"-"+data2requisito[0]+" 00:00");
				tempodobro = data2requisito.toLocaleDateString();
				data2requisito.setDate(data2requisito.getDate()-dobro);
				emdobro = data2requisito.toLocaleDateString();
				//tempodobro = tanos25;
				//tempodobro.setDate(tanos25.getDate() + meses4);
				
				
				//emdobro = tanos25;
				//emdobro.setDate(tanos25.getDate() + meses4 - dobro);
				//emdobro.setDate(tanos25.getDate() - dobro);
				//emdobro = formatDate(emdobro) + " op2";
			}
			
			if (dobro +  $("#tempo").val() > 10958 ||  dobro +  $("#total").val() > 10958 ) { 
				$("#anos30").addClass("bg-warning");
			} else {
				$("#anos30").removeClass("bg-warning");
			}
			
	//		frmMilitar = isNaN(parseInt($("#avMilitar").val())) ? 0 : parseInt($("#avMilitar").val());
	//		if (frmMilitar > 0) {
	//			$("#frmMilitar").show();
	//		} else {
	//			$("#frmMilitar").hide();
	//		}
		
		}
		
		
		$("#ingresso").on("change", function(){	
			$("#avMilitar").val('');
			$("#avCivil").val('');
			$("#afastamentos").val('');
			$("#dobro").val('');
			$("#afastamentos2").val('');
			atualiza();		
		});
		$("#avMilitar").on("change", function(valor){			atualiza();	$("#apSomaMilitar").html(" ("+$("#avMilitar").val()+" dias)");});
		$("#avCivil").on("change", function(){			atualiza();		$("#apSomaCivil").html(" ("+$("#avCivil").val()+" dias)");	});
		$("#afastamentos").on("change", function(){			
			atualiza();	
			soma1 = isNaN(parseInt($("#afastamentos").val())) ? 0 : parseInt($("#afastamentos").val());
			soma2 = isNaN(parseInt($("#afastamentos2").val())) ? 0 : parseInt($("#afastamentos2").val());
			totaliza = soma1 + soma2;
			$("#apSomaAfastamentos").html(" ("+totaliza+" dias)");	
		});
		$("#dobro").on("change", function(){			atualiza();		$("#apSomaFicto").html(" ("+$("#dobro").val()+" dias)");	});
		$("#afastamentos2").on("change", function(){			
			atualiza();		
			soma1 = isNaN(parseInt($("#afastamentos").val())) ? 0 : parseInt($("#afastamentos").val());
			soma2 = isNaN(parseInt($("#afastamentos2").val())) ? 0 : parseInt($("#afastamentos2").val());
			totaliza = soma1 + soma2;
			$("#apSomaAfastamentos").html(" ("+totaliza+" dias)");	
		});
	
	$(window).on("load", function(){
		var conteudoAjax = $('#impressao');
		conteudoAjax.load('relatorio.html');
		var conteudoAjax = $('#impressaoabono');
		conteudoAjax.load('abono.html');
	});
	
	function funcao_pdf(tipo){
		preparaRel();
		var pegar_dados = document.getElementById('impressao').innerHTML;
		var requerente = document.getElementById('rg').value;
		var janela = window.open('','','width=1400,height=600');
			janela.document.write('<html><head>');
			janela.document.write('<meta http-equiv="Content-Type" content="application/pdf; charset=utf-8">');
			//janela.document.write('<link type="text/css" rel="stylesheet" href="resources/sheet.css" >');
			janela.document.write('<title>Req. RG '+requerente+' - Calculadora SEPM/DPA/SM</title></head>');
			janela.document.write('<body>');
			janela.document.write(pegar_dados);
			janela.document.write('</body></html>');
			//janela.print();
			//janela.close();
	}
	
	function preparaRel(){
		var txt1 = $("#gh").val() + " PM RG " + $("#rg").val() + " " + $("#nome").val() + " - LOTAÇÃO: "+$("#opm").val()+ " INCORPORAÇÃO: " + formatDate(new Date($("#ingresso").val() + " 00:00"));
		$("#tipoform").html("RESERVA REMUNERADA");
		$("#txt1").html(txt1);
		$("#txt2").html($("#tempo").val());
		$("#txt3").html($("#avMilitar").val());
		$("#txt4").html($("#avCivil").val());
		$("#txt5").html($("#afastamentos").val());
		$("#txt6").html(total+" dias<br>"+tservico);
		$("#txt7").html($("#diferenca").val()+" dias<br>"+tfaltante);
		$("#txt8").html($("#pedagio").val()+" dias<br>"+tfaltantepedagio);
		
		
		var soma = Math.abs(parseInt($("#diferenca").val()) + parseInt($("#pedagio").val()));
		$("#txt9").html(soma+" dias<br>"+tfaltantepedagiosoma);
		//$("#txt10").html($("#afastamentos").val());
		$("#txt11").html($("#afastamentos2").val());
		$("#txt12").html($("#anos30com17").val());
		$("#txt13").html($("#anos25").val());
		$("#txt14").html($("#diferenca").val()+" dias<br>"+tfaltante);
		$("#txt15").html(meses4+" dias<br>"+meses4dias);
		$("#txt16").html($("#tempomilitar").val());
		$("#txt17").html(dobro+" dias");
		//$("#txt299").html("30 ANOS EM "+$("#anos30").val()+" | ");
		$("#txt200").html(tempodobro);
		
		var novotempo1 = dobro;
		var novotempo2 = parseInt($("#tempo").val());
		var novotempo3 = parseInt($("#total").val());
		var cond1 = novotempo1 + novotempo2;
		var cond2 = novotempo1 + novotempo3;
		
		$("#txtComplementar").hide();
		
		if (parseInt(cond1) > 10958 ||  parseInt(cond2) > 10958 ) { 
			$("#txt7").html("*****");
			$("#txt8").html("*****");
			$("#txt9").html("*****");
			$("#txt12").html("*****");
			$("#txt300").html("DIREITO ADQUIRIDO<BR>");
			if (dobro>0) {
				var temdobro = new Date(foraRegra);
				temdobro.setDate(temdobro.getDate() - dobro );
				temdobro = temdobro.toLocaleDateString();
				$("#txt200").html($("#anos30").val());
				$("#txt201").html("APTO PARA RESERVA REMUNERADA EM "+temdobro + " (Tempo Ficto aplicado)");
				$("#txtComplementar").show();
			} else {
				$("#txt201").html("");
				$("#txt200").html($("#anos30").val());
			}
		} else {
			$("#txt300").html("EM CONFORMIDADE COM A REGRA DE TRANSIÇÃO<BR>");
			if (parseInt($("#dobro").val())>0) {
				$("#txt201").html("APTO PARA RESERVA REMUNERADA EM "+emdobro + " (Tempo Ficto aplicado)");
				$("#txtComplementar").show();
			} else {
				$("#txt201").html("");
			}
		}
	}
	
	function preparaRelAbono(){
		var txt1 = $("#gh").val() + " PM RG " + $("#rg").val() + " " + $("#nome").val() + " - LOTAÇÃO: "+$("#opm").val()+ "<br>INCORPORAÇÃO: " + formatDate(new Date($("#ingresso").val() + " 00:00")) + ", ";
		txt1 += "Id funcional: "+$("#ap_id_funcional").val()+", nascimento: "+formatDate(new Date($("#ap_nascimento").val() + " 00:00"))+", sexo: "+$("#ap_sexo").val()+", tel.: "+$("#ap_telefone").val();
		$("#tipoform").html("ABONO DE PERMANÊNCIA");
		$("#txt1").html(txt1);
		$("#txt2").html($("#tempo").val());
		$("#txt3").html($("#avMilitar").val());
		$("#txt4").html($("#avCivil").val());
		$("#txt5").html($("#afastamentos").val());
		$("#txt6").html(total+" dias<br>"+tservico);
		$("#txt7").html($("#diferenca").val()+" dias<br>"+tfaltante);
		$("#txt8").html($("#pedagio").val()+" dias<br>"+tfaltantepedagio);
		
		
		var soma = Math.abs(parseInt($("#diferenca").val()) + parseInt($("#pedagio").val()));
		$("#txt9").html(soma+" dias<br>"+tfaltantepedagiosoma);
		//$("#txt10").html($("#afastamentos").val());
		$("#txt11").html($("#afastamentos2").val());
		$("#txt12").html($("#anos30com17").val());
		$("#txt13").html($("#anos25").val());
		$("#txt14").html($("#diferenca").val()+" dias<br>"+tfaltante);
		$("#txt15").html(meses4+" dias<br>"+meses4dias);
		$("#txt16").html($("#tempomilitar").val());
		$("#txt17").html(dobro+" dias");
		//$("#txt299").html("30 ANOS EM "+$("#anos30").val()+" | ");
		$("#txt200").html(tempodobro);
		
		var novotempo1 = dobro;
		var novotempo2 = parseInt($("#tempo").val());
		var novotempo3 = parseInt($("#total").val());
		var cond1 = novotempo1 + novotempo2;
		var cond2 = novotempo1 + novotempo3;
		
		if (parseInt(cond1) > 10958 ||  parseInt(cond2) > 10958 ) { 
			$("#txt7").html("*****");
			$("#txt8").html("*****");
			$("#txt9").html("*****");
			$("#txt12").html("*****");
			$("#txt300").html("DIREITO ADQUIRIDO<BR>");
			if (dobro>0) {
				var temdobro = new Date(foraRegra);
				temdobro.setDate(temdobro.getDate() - dobro );
				temdobro = temdobro.toLocaleDateString();
				//$("#txt200").html("APTO PARA ABONO DE PERMANÊNCIA EM "+$("#anos30").val());
				$("#txt200").html("APTO PARA ABONO DE PERMANÊNCIA EM "+temdobro + " (Tempo Ficto utilizado)");
			} else {
				$("#txt201").html("");
				//$("#txt200").html($("#anos30").val());
				$("#txt200").html("APTO PARA ABONO DE PERMANÊNCIA EM "+$("#anos30").val());
			}
		} else {
			$("#txt300").html("EM CONFORMIDADE COM A REGRA DE TRANSIÇÃO<BR>");
			if (parseInt($("#dobro").val())>0) {
				$("#txt200").html("APTO PARA ABONO DE PERMANÊNCIA EM "+emdobro + " (Tempo Ficto utilizado)");
			} else {
				//$("#txt201").html("");
				$("#txt200").html("APTO PARA ABONO DE PERMANÊNCIA EM "+tempodobro);
			}
		}
	}
	
	function imprimePDF(){
		preparaRel();
		var pegar_dados = document.getElementById('impressao').innerHTML;
		var requerente = document.getElementById('rg').value;
		document.getElementById('requerente').value = requerente;
		var txtHtml = '<html><head>';
		txtHtml += '<meta http-equiv="Content-Type" content="application/pdf; charset=utf-8">';
		txtHtml += '<title>RR RG '+requerente+' - Requerimento</title></head>';
		txtHtml += '<body>';
		txtHtml += pegar_dados;
		txtHtml += '</body></html>';
		
		document.getElementById("mostrar").value = txtHtml;
		document.getElementById("formpdf").action = "reservaremunerada.php";
		document.getElementById("formpdf").submit();
	}
	
	function imprimeabonoPDF(){
	
		if($("#ap_id_funcional").val().length < 1 || formatDate(new Date($("#ap_nascimento").val())) == 'Invalid Date' || $("#ap_telefone").val().length < 8) {
			$("#alertaTexto").html("A identificação do PM é obrigatória");
			$("#btnAlerta").click();
			return false;
		}
		
		soma_militar = isNaN(parseInt($("#ap_forcasarmadas").val())) ? 0 : parseInt($("#ap_forcasarmadas").val());
		soma_militar += isNaN(parseInt($("#ap_bombeiro").val())) ? 0 : parseInt($("#ap_bombeiro").val());
		soma_militar += isNaN(parseInt($("#ap_pmoutras").val())) ? 0 : parseInt($("#ap_pmoutras").val());
		soma_militar += isNaN(parseInt($("#ap_pmerj").val())) ? 0 : parseInt($("#ap_pmerj").val());
		ref_militar = isNaN(parseInt($("#avMilitar").val())) ? 0 : parseInt($("#avMilitar").val());
		if (ref_militar != soma_militar) {
			$("#alertaTexto").html("TEMPO MILITAR");
			$("#btnAlerta").click();
			return false;
		}
		
		soma_civil = isNaN(parseInt($("#ap_inss").val())) ? 0 : parseInt($("#ap_inss").val());
		soma_civil += isNaN(parseInt($("#ap_aluno").val())) ? 0 : parseInt($("#ap_aluno").val());
		soma_civil += isNaN(parseInt($("#ap_sp_federal").val())) ? 0 : parseInt($("#ap_sp_federal").val());
		soma_civil += isNaN(parseInt($("#ap_sp_estadual").val())) ? 0 : parseInt($("#ap_sp_estadual").val());
		soma_civil += isNaN(parseInt($("#ap_sp_df").val())) ? 0 : parseInt($("#ap_sp_df").val());
		soma_civil += isNaN(parseInt($("#ap_sp_municipal").val())) ? 0 : parseInt($("#ap_sp_municipal").val());
		ref_civil = isNaN(parseInt($("#avCivil").val())) ? 0 : parseInt($("#avCivil").val());
		if (ref_civil != soma_civil) {
			$("#alertaTexto").html("TEMPO CIVIL");
			$("#btnAlerta").click();
			return false;
		}
		
		soma_afastamentos = isNaN(parseInt($("#ap_ltip").val())) ? 0 : parseInt($("#ap_ltip").val());
		soma_afastamentos += isNaN(parseInt($("#ap_desercao").val())) ? 0 : parseInt($("#ap_desercao").val());
		ref_afastamentos1 = isNaN(parseInt($("#afastamentos").val())) ? 0 : parseInt($("#afastamentos").val());
		ref_afastamentos2 = isNaN(parseInt($("#afastamentos2").val())) ? 0 : parseInt($("#afastamentos2").val());
		ref_afastamentos = ref_afastamentos1 + ref_afastamentos2;
		if (ref_afastamentos != soma_afastamentos) {
			$("#alertaTexto").html("AFASTAMENTOS");
			$("#btnAlerta").click();
			return false;
		}
		
		soma_ficto = isNaN(parseInt($("#ap_le").val())) ? 0 : parseInt($("#ap_le").val());
		soma_ficto += isNaN(parseInt($("#ap_ferias").val())) ? 0 : parseInt($("#ap_ferias").val());
		ref_ficto = isNaN(parseInt($("#dobro").val())) ? 0 : parseInt($("#dobro").val());
		if (ref_ficto != soma_ficto) {
			$("#alertaTexto").html("TEMPO FICTO");
			$("#btnAlerta").click();
			return false;
		}
		
		preparaRelAbono();
		$("#atxt1").html($("#txt1").html());
		$("#atxt2").html($("#txt2").html());
		$("#atxt3").html($("#txt3").html());
		$("#atxt4").html($("#txt4").html());
		$("#atxt5").html($("#txt5").html());
		$("#atxt6").html($("#txt6").html());
		$("#atxt7").html($("#txt7").html());
		$("#atxt8").html($("#txt8").html());
		$("#atxt9").html($("#txt9").html());
		$("#atxt10").html($("#txt10").html());
		$("#atxt11").html($("#txt11").html());
		$("#atxt12").html($("#txt12").html());
		$("#atxt13").html($("#txt13").html());
		$("#atxt14").html($("#txt14").html());
		$("#atxt15").html($("#txt15").html());
		$("#atxt16").html($("#txt16").html());
		$("#atxt17").html($("#txt17").html());
		$("#atxt299").html($("#txt299").html());
		$("#atxt200").html($("#txt200").html());
		$("#atxt300").html($("#txt300").html());
		$("#atxt201").html($("#txt201").html());

		$("#atxt301").html($("#txt301").html());
		
		var amilitar = "";
		if(parseInt($("#ap_forcasarmadas").val())>0) {
			amilitar = "<br>FFAA: "+$("#ap_forcasarmadas").val()+"d";
		}
		if(parseInt($("#ap_bombeiro").val())>0) {
			amilitar += (amilitar == "") ? "<br>Bombeiro: "+$("#ap_bombeiro").val()+"d" : " / Bombeiro: "+$("#ap_bombeiro").val()+"d";
		}
		if(parseInt($("#ap_pmoutras").val())>0) {
			amilitar += (amilitar == "") ? "<br>PM Outras UFs: "+$("#ap_pmoutras").val()+"d" : " / PM Outras UFs: "+$("#ap_pmoutras").val()+"d";
		}
		if(parseInt($("#ap_pmerj").val())>0) {
			amilitar += (amilitar == "") ? "<br>PMERJ: "+$("#ap_pmerj").val()+"d" : " / PMERJ: "+$("#ap_pmerj").val()+"d";
		}
		
		$("#amilitar").html(amilitar);
		
		var acivil = "";
		if(parseInt($("#ap_inss").val())>0) {
			acivil = "<br>INSS: "+$("#ap_inss").val()+"d";
		}
		if(parseInt($("#ap_aluno").val())>0) {
			textoinsere = "Aluno aprendiz: "+$("#ap_aluno").val()+"d";
			acivil += (acivil == "") ? "<br>"+textoinsere : " / " + textoinsere;
		}
		ser_fed = isNaN(parseInt($("#ap_sp_federal").val())) ? 0 : parseInt($("#ap_sp_federal").val());
		ser_est = isNaN(parseInt($("#ap_sp_estadual").val())) ? 0 : parseInt($("#ap_sp_estadual").val());
		ser_df = isNaN(parseInt($("#ap_sp_df").val())) ? 0 : parseInt($("#ap_sp_df").val());
		ser_mun = isNaN(parseInt($("#ap_sp_municipal").val())) ? 0 : parseInt($("#ap_sp_municipal").val());
		
		if( ser_fed + ser_est + ser_df + ser_mun>0) {
			acivil += (acivil == "") ? "<br>"+"Serviço Público" : " / " + "Serviço Público";
			if(ser_fed>0) {
				textoinsere = " Federal: "+$("#ap_sp_federal").val()+"d";
				acivil += textoinsere;
			}
			if(ser_est>0) {
				textoinsere = " Estadual: "+$("#ap_sp_estadual").val()+"d";
				acivil += textoinsere;
			}
			if(ser_df>0) {
				textoinsere = " DF: "+$("#ap_sp_df").val()+"d";
				acivil += textoinsere;
			}
			if(ser_mun>0) {
				textoinsere = " Municipal: "+$("#ap_sp_municipal").val()+"d";
				acivil += textoinsere;
			}
		}
		
		$("#acivil").html(acivil);
		
		var aafastamentos = "";
		if(parseInt($("#ap_ltip").val())>0) {
			aafastamentos = "<br>LTIP: "+$("#ap_ltip").val()+"d";
		}
		if(parseInt($("#ap_desercao").val())>0) {
			textoinsere = "Deserção: "+$("#ap_desercao").val()+"d";
			aafastamentos += (aafastamentos == "") ? "<br>"+textoinsere : " / " + textoinsere;
		}
		
		$("#aafastamentos").html(aafastamentos);
		
		var aficto = "";
		if(parseInt($("#ap_le").val())>0) {
			aficto = "<br>LE: "+$("#ap_le").val()+"d";
		}
		if(parseInt($("#ap_ferias").val())>0) {
			textoinsere = "Férias: "+$("#ap_ferias").val()+"d";
			aficto += (aficto == "") ? "<br>"+textoinsere : ", " + textoinsere;
		}
		
		$("#aficto").html(aficto);
		
		var pegar_dados = document.getElementById('impressaoabono').innerHTML;
		var requerente = document.getElementById('rg').value;
		document.getElementById('requerente').value = requerente;
		
		var txtHtml = '<html><head>';
		txtHtml += '<meta http-equiv="Content-Type" content="application/pdf; charset=utf-8">';
		txtHtml += '<title>AP RG '+requerente+' - Requerimento</title></head>';
		txtHtml += '<body>';
		txtHtml += pegar_dados;
		txtHtml += '</body></html>';
		
		document.getElementById("mostrar").value = txtHtml;
		document.getElementById("formpdf").action = "abonopermanencia.php";
		document.getElementById("formpdf").submit();
	}
	
	//tempofaltante25anos = 
	
	function tempoHumano(inicio,termino){
		//var inicio = moment('24-05-1982', 'DD-MM-YYYY');
		//var agora = moment('2015-06-25');
		var inicio = moment(inicio,'DD/MM/YYYY');
		var agora = moment(termino,'DD/MM/YYYY');

		var diferenca = moment.duration({
			years: agora.year() - inicio.year(),
			months: agora.month() - inicio.month(),
			days: agora.date() - inicio.date()
		});

		//document.getElementById("anos").innerHTML = diferenca.years() + ' ano(s)';
		//document.getElementById("meses").innerHTML = diferenca.months() + ' mese(s)';
		//document.getElementById("dias").innerHTML = diferenca.days() + ' dia(s)';
		return diferenca.years() + 'a, ' + diferenca.months() + 'm, ' + diferenca.days() + 'd';
	}