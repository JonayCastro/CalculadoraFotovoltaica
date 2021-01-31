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
        var d = new jsPDF();
        
        d.setFontSize(10);
        d.text(5, 5, 'Fecha: '+dateProyect);
        
        d.setFontSize(30);
        d.text(5, 25, 'Proyecto '+proyectName);
        
        d.setLineWidth(0.5);
        d.line(5, 30, 120, 30);
        
        d.setFontSize(20);
        d.text(10, 40, 'Datos del Cliente');
        d.setLineWidth(0.5);
        d.line(10, 45, 70, 45);
        
        d.setFontSize(16);
        d.text(15, 55, 'Nombre: '+clientName);
        d.text(15, 65, 'Apellidos: '+clientSecondName);
        d.text(15, 75, 'Dirección: '+dirClient);
        d.text(15, 85, 'Email: '+emailClient);
        d.text(15, 95, 'Teléfono: '+tfnClient);

        d.setFontSize(20);
        d.text(10, 105, 'Datos de Consumo');
        d.line(10, 110, 80, 110);

        readTable();
        d.autoTable(
            { 
                head:[['Receptor','Tensión (V)','Corriente','Potencia (W)','Tiempo (h)','Consumo (Wh)'],{
                    styles:{
                        textColor:[255,255,255]
                    }
                }],
                body:arrLines,
                margin:{
                        top:120,
                        left:10
                    }
            }
        );
        
        d.addPage();
        
        d.setFontSize(20);
        d.text(10, 25, 'Resultados');
        d.setLineWidth(0.5);
        d.line(10, 30, 50, 30);

        d.setFontSize(16);
        d.text(15, 40, 'Consumo Total (CA+CC): '+tConsum+' Wh');
        d.text(20, 50, 'Consumo CA: '+tAc+' Wh');
        d.text(20, 60, 'Consumo CC: '+tDc+' Wh');
        d.text(15, 70, 'Potencia Total (CA+CC): '+tPonten+' W');
        d.text(20, 80, 'Potencia CA: '+tPotenCA+' W');
        d.text(20, 90, 'Potencia CC: '+tPotenCC+' W');
        d.text(15, 100, 'Energía: '+tEnerCampo+' Wh');
        d.text(15, 110, 'Rendimiento: '+tRendimiento);
        d.text(15, 120, 'HSP: '+hspValue);
        d.text(15, 130, 'Potencia Pico: '+tPotenciaPico+' W');
        d.text(15, 140, 'Tensión Nominal Sistema: '+tnsValue+' V');
        d.text(15, 150, 'Nº Paneles Serie: '+numPSerieValue);
        d.text(15, 160, 'Nº Paneles Paralelo: '+numPParalelo);
        d.text(15, 170, 'Nº Paneles Totales: '+numTpaneles);
        d.text(20, 180, 'Modelo de Panel: '+panelModel);
        d.text(15, 190, 'Capacidad Batería: '+capNomBatFinValue);
        d.text(15, 200, 'Nº Baterías Serie: '+numBatSerieValue);
        d.text(15, 210, 'Nº Baterías Paralelo: '+numBatParaValue);
        d.text(15, 220, 'Nº Baterías Totales: '+numBatTotalValue);
        d.text(20, 230, 'Modelo de Batería: '+batModel);
        d.text(15, 240, 'Intensidad General: '+igValue+' A');
        d.text(15, 250, 'Intensidad Inversor: '+iciValue+' A');
        d.text(15, 260, 'Potensia Entrada Inversor: '+pInInver+' W');
        d.text(20, 270, 'Modelo de Inversor: '+invModel);


        
        d.save('nuevo_proyecto.pdf');
    });
});