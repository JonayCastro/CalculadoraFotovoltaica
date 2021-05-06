var arrLines;
function readTable(){
    var lines = document.querySelectorAll('.table-consum-row');
    arrLines = [];
    for(var i=0;i<lines.length;i++){
        let line = [];
        line.push($('#consum-row-'+(i+1)+' .nReceptor').val());
        line.push($('#consum-row-'+(i+1)+' .corriente').val());
        line.push($('#consum-row-'+(i+1)+' .tCorriente').val());
        line.push($('#consum-row-'+(i+1)+' .potencia').val());
        line.push($('#consum-row-'+(i+1)+' .horas').val());
        line.push($('#consum-row-'+(i+1)+' .energia').val());
        arrLines.push(line);
    }
}

$(document).ready(function(){
    $(document).on('click', '#btn-export', function(){
        window.print();
    });
});