function getClear(){
    var table = document.getElementById('emptbl');
    table.rows.length=2;
    document.getElementsByTagName("td").innerText="";

}

function addRows() {
    var table = document.getElementById('emptbl');
    var rowCount = table.rows.length;
    var cellCount = table.rows[0].cells.length;
    var row = table.insertRow(rowCount);
    for (var i = 0; i <= cellCount; i++) {
        var cell = 'cell' + i;
        cell = row.insertCell(i);
        var copycel = document.getElementById('col' + i).innerHTML;
        cell.innerHTML = copycel;
    }
}
function deleteRows() {
    var table = document.getElementById('emptbl');
    var rowCount = table.rows.length;
    if (rowCount > '2') {
        var row = table.deleteRow(rowCount - 1);
        rowCount--;
    }
   
}
function getClear(){
    location.reload()
}
function findTaxRate(a) {
    var tax = 0
    if (a === "2")
        tax = 10
    else if (a === "3")
        tax = 5
    else if (a === "4")
        tax = 15
    return tax
}
function calculate() {
    var table = document.getElementById('emptbl');
    var rowCount = table.rows.length;
    var pat,pbt,pat_sum=0,pbt_sum=0,sales_tax;
    document.getElementById("content-output").innerHTML="";
    document.getElementById("sales-content-output").innerHTML=""; 
    document.getElementById("content-input").innerHTML="";
    console.log(form1.item.value)
    

    if (rowCount === 2) {  
        if(!form1.qty.value||form1.qty.value==0||!form1.rate.value || form1.item.value==""||form1.type.value==0){
            document.getElementById("content-input").innerHTML="Invalid Input, Fill properly";
            // document.getElementById("content-output").innerHTML="No Output for Invalid Input";
            return
        }
            pbt = (parseFloat(form1.rate.value,10) * parseFloat(form1.qty.value,10)); 
            taxrate = findTaxRate(form1.type.value);
            taxrate=parseInt(taxrate,10);
            var pat = (pbt * (100 + taxrate)) / 100;
            pat = Number(pat).toFixed(2);
            
    form1.pbt.value = Number(pbt).toFixed(2);
    form1.tax.value = taxrate
    form1.pat.value = pat;
    sales_tax=pat-pbt;
    sales_tax=sales_tax.toFixed(2);
    document.getElementById("content-input").innerHTML=(form1.qty.value+" "+form1.item.value+" at "+pbt);
    document.getElementById("content-output").innerHTML=(form1.qty.value+" "+form1.item.value+" : "+pat);
    document.getElementById("sales-content-output").innerHTML=("Sales Taxes : "+sales_tax+"<br> Total : "+pat);
    }
    else if (rowCount > 2) {
        rowCount = rowCount - 1
        for (var i = 0; i < rowCount; i++) {

            if(!form1.qty[i].value||form1.qty[i].value==0||!form1.rate[i].value || form1.item[i].value==""||form1.type[i].value==0){
                document.getElementById("content-input").innerHTML="Invalid Input, Fill properly";
                document.getElementById("content-output").innerHTML="";
                return
            }

            pbt = ((parseFloat(form1.rate[i].value,10)) * (parseFloat(form1.qty[i].value,10))).toFixed(2); 
            taxrate = findTaxRate(form1.type[i].value);
            taxrate=parseInt(taxrate,10);
            pat = (pbt * (100 + taxrate))/ 100;
            pat = parseFloat(pat, 10).toFixed(2);
            form1.pbt[i].value = pbt;
            form1.tax[i].value = taxrate;                  
            form1.pat[i].value = pat;
            pat_sum=parseFloat(pat_sum,10)+parseFloat(pat);
            pat_sum=pat_sum.toFixed(2);
            pbt_sum=parseFloat(pbt_sum)+parseFloat(pbt);   
            pbt_sum=pbt_sum.toFixed(2);              
            document.getElementById("content-input").innerHTML+=(form1.qty[i].value+" "+form1.item[i].value+" at "+pbt+"<br>");
            document.getElementById("content-output").innerHTML+=(form1.qty[i].value+" "+form1.item[i].value+" : "+pat+"<br>");                  
        }  
        sales_tax=parseFloat(pat_sum,10)-parseFloat(pbt_sum,10);
        sales_tax=sales_tax.toFixed(2);
        document.getElementById("sales-content-output").innerHTML=("Sales Taxes : "+sales_tax+"<br> Total : "+pat_sum);         
    }           
}