/* [gridNess] */
/*
 * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 *
 *	>site : http://www.nessy.com.ar
 *	>author : Francisco Rosales <francisco.rosales@gmail.com>
 *	@id = {string}
 * 		: optional (default = 'NessGrid')
 *		: id of the main table (<table id={id} ...)
 *	@containerDIV = {string}
 *		: obligatory
 *		: div that while displayed the table
 *	@dataTable = {cols:[{Ness.Grid.Pojo.Column}],rows:[{Ness.Grid.Pojo.Row}]}
 *		: managed by application
 *		: all data
 *	@onClick = function({rowObj}){}
 *		: optional (default = function(){})
 *		: click event function of the row with row object argument
 *	@colId = {number}
 *		: optional (default = 0)
 *		: column number that help to the Ness system to manage data
 *
 *	<static> Ness.Grid.Pojo.Column : { title:{string}, width:{number} }
 *	<static> Ness.Grid.Pojo.Row : { data:{string}, style:{string} }
 *	<static> Ness.Grid.Util.Convert2RowData : Convert simple array of {string} in array of {Ness.Grid.Pojo.Row}
 *
 *	<>insertRow(Ness.Grid.Pojo.Row)
 *		: insert row
 *	<>updateRow(Ness.Grid.Pojo.Row)
 *		: update row
 *	<>deleteRow(Ness.Grid.Pojo.Row)
 *		: delete row with row object argument
 *	<>deleteRow({number})
 *		: delete row with row index argument (position of dataTable.rows)
 *	<>getRowIndexById({number})
 *		: get row index {number} by passing id argument (colId numner)
 *	<>deleteAllRows()
 *		: delete all data in dataTable and display empty table
 *	> ! orderBy not finished, only order by DESC
 *	<>orderBy()
 *
 */

var Ness = {
  Version: '20070727-1'
}
Ness.Elements = {
	liste: [],
	addItem: function(elem){ this.liste.push(elem); },
	getByID: function(idElem){
		var ret;
		for(var i=0; i<this.liste.length; i++){
			if(this.liste[i].id==idElem){ ret = this.liste[i]; }
		}
		return ret;
	}
}
Ness.Grid = function(config){
	this.id = "NessGrid";
	this.containerDIV = "";
	this.dataTable = {};
	this.onClick = function(){};
	this.colId = 0;
	this.mouseOverOut = true;
	this.columnOrder = true;
	if(arguments.length > 0) this.init(config);
	Ness.Elements.addItem(this);
}
Ness.Grid.prototype.init = function(config) {
	for(var cada in config) {
        if (config.hasOwnProperty(cada)) {
            if (this[cada] != undefined) {
                this[cada] = config[cada];
            }
        }
    }
};
Ness.Grid.prototype.display = function(){
	var gHtml = "\
			<table id='{id}' class='NessGrid' width='{widthTotal}' cellspacing='1'>\
			{widthCols}\
			<tr>\
				{column}\
			</tr>\
				{rows}\
			</table>\
			";
	gHtml = gHtml.replace("{id}",this.id);
	gHtml = gHtml.replace("{widthTotal}",this._getWidthTotal());
	gHtml = gHtml.replace("{widthCols}",this._getWidth2HTML());
	gHtml = gHtml.replace("{column}",this._getTitle2HTML());
	gHtml = gHtml.replace("{rows}",this._getRows2HTML());
	$("#"+ this.containerDIV).html(gHtml);
	$("#"+ this.containerDIV).css("display", "");
}
Ness.Grid.prototype._getWidthTotal = function(){
	var total = 0;
	var cols = this.dataTable.cols;
	for(var i=0; i<cols.length; i++){
		var nro = Number(cols[i].width);
		if(!isNaN(nro)){
			total += nro;
		}
	}
	return total;
}
Ness.Grid.prototype._getWidth2HTML = function(){
	var cols = this.dataTable.cols;
	var tHtml = "";
	for(var i=0; i<cols.length; i++){
		var txt = "<col width='{width}'>";
		txt = txt.replace("{width}",cols[i].width);
		tHtml += txt;
	}
	return tHtml;
}
Ness.Grid.prototype._getRows2HTML = function(){
	var rows = this.dataTable.rows;
	var tHtml = "";
	for(var i=0; i<rows.length; i++){
		var txt = "\
			<tr height='22'>\
				{values}\
			</tr>\
			";
		txt = txt.split("{values}").join(this._getValues2HTML(rows[i],i));
		tHtml += txt;
	}
	return tHtml;
}
Ness.Grid.prototype._getRowName = function(rowIndex){
	return "rowNess"+rowIndex;
}
Ness.Grid.prototype._getValues2HTML = function(oneRow,rowIndex){
	var tHtml = "";
	var colCount = this.dataTable.cols.length;
	for(var i=0; i<colCount; i++){
		var txt = "\
					<td class='{tdClass}' id='{rowId}' {style} \
					{mouseOverOut} \
					onclick='Ness.Grid.EventClick(\"{idGrid}\",{rowIndex})' >\
					<span style='width:{width}px;overflow:hidden'>{valor}</span>\
					</td>\
				";
		var mouseOverOutTxt = "";
		if(this.mouseOverOut){
			mouseOverOutTxt = "\
					onmouseover='Ness.Grid.EventMouseOver(this)' \
					onmouseout='Ness.Grid.EventMouseOut(this)' \
					";
		}
		var valor = oneRow[i].data;
		var style = (oneRow[i].style!=undefined)?"style='"+oneRow[i].style+"'":"";
		txt = txt.replace("{mouseOverOut}",mouseOverOutTxt);
		txt = txt.replace("{idGrid}",this.id);
		txt = txt.replace("{rowIndex}",rowIndex);
		txt = txt.replace("{valor}",valor);
		txt = txt.replace("{style}",style);
		txt = txt.replace("{width}",this.dataTable.cols[i].width);
		var tdClass = (rowIndex%2==1)?"nessRowOdd":"nessRowEven";
		if(i==this.colId){ tdClass = "nessColID"; }
		txt = txt.replace("{tdClass}",tdClass);
		txt = txt.replace("{rowId}",this._getRowName(rowIndex));
		tHtml += txt;
	}
	return tHtml;
}
Ness.Grid.prototype._getTitle2HTML = function(){
	var column = this.dataTable.cols;
	var tHtml = "";
	for(var i=0; i<column.length; i++){
		var title = column[i].title;
		var thClass = (i==0)?"nessTHeadID":"";
		var txt = "<th class='{thClass}' {thOnClick}>{title} <img src='i/orden_desc.png' width='7' height='5'></th>";
		var thOnClick = "";
		if(this.columnOrder){
			thOnClick = "onclick='Ness.Grid.EventOrder(\"{idGrid}\",{colIndex})'";
			thClass += " nessTHOrder";
		}
		txt = txt.replace("{thOnClick}",thOnClick);
		txt = txt.replace("{colIndex}",i);
		txt = txt.replace("{idGrid}",this.id);
		txt = txt.replace("{title}",title);
		txt = txt.replace("{thClass}",thClass);
		tHtml += txt;
	}
	return tHtml;
}
Ness.Grid.EventMouseOver = function (element) {
	var nodosTd = element.parentNode.getElementsByTagName('td');
	var cant = nodosTd.length;
	for(var i=0; i<cant; i++){
		var nodoTd = nodosTd[i];
		nodoTd.oldClass = nodoTd.className;
		var classOver = "nessRowOver";
		if (nodoTd.className === "nessColID") {
		     classOver = "nessColIDOver";
		}
		if(nodoTd.className !== "nessColID"){
			nodoTd.className += " "+classOver;
		}
	}
}
Ness.Grid.EventOrder = function(idGrid,colIndex){
	var instance = Ness.Elements.getByID(idGrid);
	instance.orderBy(colIndex);
	instance.selekCol(colIndex);
}
Ness.Grid.EventMouseOut = function (element) {
    $("#" + element.id).parent().find("td").removeClass('nessRowOver');
}
Ness.Grid.EventClick = function (idGrid, rowIndex) {
    $("#" + idGrid).find("td").removeClass('nessRowSelek');
    $("#" + idGrid + " .nessRowOver").addClass('nessRowSelek');
    var instance = Ness.Elements.getByID(idGrid);
    if (!instance) return;
	var row = instance.dataTable.rows[rowIndex];
	instance.onClick(row);
}
Ness.Grid.prototype.updateRow = function(rowObj){
	var rowIndex = (arguments[1]!=undefined)?arguments[1]:-1;
	if(rowIndex==-1){
		rowIndex = this.getRowIndexById(rowObj[this.colId].data);
	}
	this.dataTable.rows[rowIndex] = rowObj;
	this.display();
}
Ness.Grid.prototype.insertRow = function(rowObj){
	var rowIndex = (arguments[1]!=undefined)?arguments[1]:-1;
	if(rowIndex==-1){
		this.dataTable.rows.push(rowObj);
	} else {
		this.dataTable.rows.splice(rowIndex, 0, rowObj);
	}
	this.display();
}
Ness.Grid.prototype.deleteRow = function(obj){
	if(typeof obj == "object"){
		this._deleteRow4Obj(obj);
	} else {
		this._deleteRow4RowIndex(obj);
	}
}
Ness.Grid.prototype._deleteRow4Obj = function(rowObj){
	var rowIndex = this.getRowIndexById(rowObj[this.colId].data);
	this._deleteRow4RowIndex(rowIndex);
}
Ness.Grid.prototype._deleteRow4RowIndex = function(rowIndex){
	this.dataTable.rows.splice(rowIndex,1);
	this.display();
}
Ness.Grid.prototype.deleteAllRows = function(){
	this.dataTable.rows = [];
	this.display();
}
Ness.Grid.prototype.getDataById = function(id){
	var ret;
	var rows = this.dataTable.rows;
	for(var i=0; i<rows.length; i++){
		if(rows[i][this.colId].data==id){ ret = rows[i]; }
	}
	return ret;
}
Ness.Grid.prototype.getRowIndexById = function(id){
	var ret;
	var rows = this.dataTable.rows;
	for(var i=0; i<rows.length; i++){
		if(rows[i][this.colId].data==id){ ret = i; }
	}
	return ret;
}
Ness.Grid.Util = {};
Ness.Grid.Util.Convert2RowData = function(arr){
	// [ {string},{string} ] -> [ {data:{string},style:{string}},{data:{string},style:{string}} ]
	var rows = [];
	for(var i=0; i<arr.length; i++){
		var rowObj = new Ness.Grid.Pojo.Row();
		var arrOne = arr[i];
		if(typeof arrOne == "string"){
			rowObj.data = arrOne;
		} else {
			for(var cada in arrOne) {
		        if (arrOne.hasOwnProperty(cada)) {
		            if (arrOne[cada] != undefined && rowObj[cada] != undefined) {
		                rowObj[cada] = arrOne[cada];
		            }
		        }
		    }
		}
		rows.push(rowObj);
	}
	return rows;
}
Ness.Grid.Pojo = {};
Ness.Grid.Pojo.Column = function(){
	this.title = '';
	this.width = 0;
	this.type = 'string'; // string, number
}
Ness.Grid.Pojo.Row = function(){
	this.data = '';
	this.style = '';
}
Ness.Grid.Util.ConvertColum2Array = function(rows,col){
	var arr = [];
	for(var i=0; i<rows.length; i++){
		var colValue = rows[i][col].data;
		arr.push(colValue);
	}
	return arr;
}
Ness.Grid.prototype.orderBy = function(colSort){
    _colSort = colSort; //_colSort variable global
	var colType = this.dataTable.cols[_colSort].type;
	var row2order = this.dataTable.rows.clone();
	var sortFNC = this._sortNumberFunc;
	if(colType=="string"){
		sortFNC = this._sortStringFunc;
	}
	this.dataTable.rows = row2order.sort(sortFNC);
	this.display();
}
Ness.Grid.prototype._sortNumberFunc = function(a, b){
	return b[_colSort].data - a[_colSort].data;
}
Ness.Grid.prototype._sortStringFunc = function(a, b){
	var valor1 = a[_colSort].data;
	var valor2 = b[_colSort].data;
    if (valor1 > valor2)
        return 1;
    if (valor1 < valor2)
        return -1;
    return 0;
} 
Ness.Grid.prototype.selekCol = function(colIndex){
	this.clearColSelek();
	var selekThs = $A($(this.id).getElementsByTagName("th"));
	for(var i=0; i<selekThs.length; i++){
		var selekTh = selekThs[i];
		if(i==colIndex){ selekTh.addClassName('nessColSelek'); }
	}
}
Ness.Grid.prototype.clearColSelek = function(){
	$(this.id).getElementsByClassName('nessColSelek').invoke('removeClassName','nessColSelek');
}

function ApplyGridNess(gridIdDiv) {
	$('#'+ gridIdDiv +' tr:odd > td').addClass('nessRowOdd');
	$('#'+ gridIdDiv +' tr:even > td').addClass('nessRowEven');
	$('#' + gridIdDiv + ' tr td:first-child').addClass('nessColID');

	var allTd = '#' + gridIdDiv + ' tr > td';

	$(allTd).each(function (i) {
	    $(this).attr('id', "rowNess" + i);
	    $(this).attr('onclick', 'Ness.Grid.EventClick(\"'+ gridIdDiv +'\",'+ i +')');
	});

	$(allTd).attr('onmouseover', 'Ness.Grid.EventMouseOver(this)');
	$(allTd).attr('onmouseout', 'Ness.Grid.EventMouseOut(this)');
}