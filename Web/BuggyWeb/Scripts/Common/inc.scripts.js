/* [inc.scrips.js] */
function img2png(iIMG,winWidth,winHeight){
	var imgCode = "<img src='"+iIMG+"' width='"+winWidth+"' height='"+winHeight+"' border='0'>";
	var esie = (navigator.appVersion.indexOf("MSIE")>-1)?true:false;
	if(esie){ imgCode = "<img src='i/dot.gif' width='"+winWidth+"' height='"+winHeight+"' border='0' style='width: "+winWidth+"px; height: "+winHeight+"px; filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+iIMG+"\", sizingMethod=\"scale\")'/>"; }
	return imgCode;
}
function dw(txtCode){
	document.write(txtCode);
}
function mostrar(elDiv){
	$("#"+elDiv).show();
}
function ocultar(elDiv){
    $("#" + elDiv).hide();
}
function trim(text){
	var start=0;
	var end=text.length-1;
	while (text.charCodeAt(start)==32 && start<end){
		start++;
	}
	while (text.charCodeAt(end)==32 && end>start){
		end--;
	}
	return text.substring(start,end+1);
}
function evalNumber(numStr){
	var separator = ",";
	var tempNum = numStr.split(separator).join("");
	// Si el texto es un tipo float se devuelve el numero, sino false
	// Si el volumen es cero lo toma como false
	if (parseFloat(tempNum) != false || tempNum == 0) {
		return parseFloat(tempNum);
	} else {
		return false;
	}
}
function openPopup(urllink){
	var windowName = "winnav";
	var winWidth = 770;
	var winHeight = 590;
	if(arguments[1]) winWidth = arguments[1];
	if(arguments[2]) winHeight = arguments[2];
	if(arguments[3]) windowName = arguments[3];
	var posx = screen.width/2 - winWidth/2;
	var posy = screen.height/2 - winHeight/2 - 10;
	winnav = window.open(urllink, windowName, "top="+posy+",left="+posx+",width="+winWidth+",height="+winHeight+",status=no,toolbar=no,scrollbars=yes,menubar=no,location=no,resizable=1");
	winnav.focus();
}
function txt2fecha(txt){
	var _fecha = txt;
	var _hora = "";
	if(txt.indexOf(" ")>-1){
		_fecha = txt.split(" ")[0];
		_hora = txt.split(" ")[1];
	}
	var anio = _fecha.split("/")[2];
	var mes = _fecha.split("/")[1];
	var dia = _fecha.split("/")[0];

	var hora = 12;
	var minuto = 0;
	var segundo = 0;
	if(_hora!=""){
		var hora = _hora.split(":")[0];
		var minuto = _hora.split(":")[1];
		var segundo = _hora.split(":")[2];
	}
	var fechaRET = new Date ( anio, mes-1, dia, hora, minuto, segundo );
	if(anio=="0001"){
		fechaRET = null;
	}
	return fechaRET;
}
function fecha2txt(fecha){
	if(fecha==null) return null;
	var tipo = (arguments[1]!=undefined)?arguments[1]:1;
	var dia = fecha.getDate();
	var mes = fecha.getMonth()+1;
	var anio = fecha.getFullYear();
	var hora = fecha.getHours();
	var minuto = fecha.getMinutes();
	var segundo = fecha.getSeconds();
	if(mes<10){ mes = "0"+mes; }
	if(minuto<10){ minuto = "0"+minuto; }
	if(segundo<10){ segundo = "0"+segundo; }
	txt = dia + "/" + mes + "/" + anio + " " + hora + ":" + minuto + ":" + segundo;
	if(tipo==2){
		txt = dia + "/" + mes + "/" + anio;
	}
	return txt;
}
function fecha2longtxt(fecha){
	if(fecha==null) return null;
	var dia = fecha.getDate();
	var mes = fecha.getMonth()+1;
	var anio = fecha.getFullYear();
	var diaTxt = fechaGetDia(fecha.getDay()-1);
	var mesTxt = fechaGetMes(mes-1);
	txt = diaTxt + " " + dia + " de " + mesTxt + " de " + anio;
	return txt;
}
function fechaGetDia(dia){
	var lista = new Array("Lunes","Martes","Miércoles","Jueves","Viernes","Sabado","Domingo");
	return lista[dia];
}
function fechaGetMes(mes){
	var lista = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	return lista[mes];
}
function fechaHora2txt(fecha){
	var txt = "";
	if(fecha==null) return null;
	var dia = fecha.getDate();
	var mes = fecha.getMonth()+1;
	var anio = fecha.getFullYear();
	var hora = fecha.getHours();
	var minuto = fecha.getMinutes();
	var segundo = fecha.getSeconds();

	if(minuto<10){ minuto = "0"+minuto; }
	if(segundo<10){ segundo = "0"+segundo; }
	txt = hora + ":" + minuto + ":" + segundo;

	var ahoraAnio = (new Date()).getFullYear();
	var ahoraMes = (new Date()).getMonth()+1;
	var ahoraDia = (new Date()).getDate();

	if(ahoraAnio!=anio){
		txt = fecha2txt(fecha);
	}
	if(ahoraMes!=mes){
		txt = fecha2txt(fecha);
	}
	if(ahoraDia!=dia){
		txt = fecha2txt(fecha);
	}
	return txt;
}
function getFlashMovieObject(movieName)
{
	if (window.document[movieName]) 
	{
		return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet")==-1)
	{
		if (document.embeds && document.embeds[movieName])
			return document.embeds[movieName]; 
	}
	else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
	{
		return document.getElementById(movieName);
	}
}
function getUrlParametros(){
	var parametros = {};
	var paramsArr = location.href.split('?');
	if(paramsArr.length>1){
		parametros = {};
		var params = paramsArr[1].split('&');
		for(var i=0; i<params.length; i++){
			parametros[params[i].split('=')[0]] = params[i].split('=')[1];
		}
	}
	return parametros;
}
function startWait(){
	mostrar("waitDIV");
}
function endWait(){
	ocultar("waitDIV");
}

$(document).ready(function () {
    endWait();
})