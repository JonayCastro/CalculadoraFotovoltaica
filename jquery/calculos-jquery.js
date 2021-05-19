
var tPonten, tConsum, tAc, tDc, tPotenCC, tPotenCA, energyTotalValue, tRendimiento, tEnerCampo,
    tPotenciaPico, numPSerieValue, pnpValue, numPParalelo, numTpaneles, capUtilBatValue, capNomBatFinValue,
    capNomBatValue, capNomBatCorecValue, ktValue, capBatAmpHora, numBatSerieValue, tnBatValue, numBatParaValue,
    capNomBatFabricaValue, numBatTotalValue, igValue, iccpValue, iciValue, pInInver = 0;

/* var tPonten = 0;
var tConsum = 0;
var tAc = 0;
var tDc = 0;
var tPotenCC = 0;
var tPotenCA = 0;
var energyTotalValue = 0;
var tRendimiento = 0;
var tEnerCampo = 0;
var tPotenciaPico = 0;
var numPSerieValue = 0;
var pnpValue = 0;
var numPParalelo = 0;
var numTpaneles = 0;
var capUtilBatValue = 0;
var capNomBatFinValue = 0;
var capNomBatValue = 0;
var capNomBatCorecValue = 0;
var ktValue = 0;
var capBatAmpHora = 0;
var numBatSerieValue = 0;
var tnBatValue = 0;
var numBatParaValue = 0;
var capNomBatFabricaValue = 0;
var numBatTotalValue = 0;
var tnRegValue = tnsValue;
var igValue = 0;
var iccpValue = 0;
var iciValue = 0;
var pInInver = 0; */

var iciTypeValue = 1;
var kbValue = 0.05;
var kaValue = 0.005;
var krValue = 0.1;
var kcValue = 0.05;
var kcMixtoValue = 0.05;
var kcFinalValue = 0.05;
var kvValue = 0.15;
var pdValue = 0.5;
var nDaysValue = 4;
var hspValue = 4;
var rpValue = 0.9;
var tnsValue = 12;
var tnpValue = 12;
    
var tempMed = 20;
    
var panelModel = '"Campo Vacío"';
var batModel = '"Campo Vacío"';
var invModel = '"Campo Vacío"';

function calculos(){
    tPonten = 0;
    tConsum = 0;
    tAc = 0;
    tDc = 0;
    tPotenCC = 0;
    tPotenCA = 0;
        
    $('.potencia').each(function(){
        tPonten+=Number($(this).val());
    });
    $('#tPoten').text(tPonten.toFixed(2));
    
    $('.energia').each(function(){
        tConsum+=Number($(this).val());
    });
    $('#tConsum').text(tConsum.toFixed(2));
    
    $('#body-table tr').each(function(){
        let ids = $(this).attr('id');
        let corriente = $('#'+ids+' .tCorriente').val();
        if(corriente == 'ac'){
            tAc+=Number($('#'+ids+' .energia').val());
            tPotenCA+=Number($('#'+ids+' .potencia').val());
        }else{
            tDc+=Number($('#'+ids+' .energia').val());
            tPotenCC+=Number($('#'+ids+' .potencia').val());
        }
    });
    /* con los condicionales siguientes establecemos la formular y calculos ha realizar en funcion del tipo de corriente
    que consumen los receptores */
    if(tDc == 0){
        $('#img-f-energia-total').attr('src','imgs/f_etotalca.png');
        $('.kcmix-item').attr('disabled', 'disabled');
        $('#kcmix-4-1').attr('disabled','disabled');
        $('.kc-item').removeAttr('disabled');
        energyTotalValue = tAc;
        kcFinalValue = kcValue;
    }else if(tAc == 0){
        $('#img-f-energia-total').attr('src','imgs/f_etotalcc.png');
        $('.kcmix-item').attr('disabled', 'disabled');
        $('#kcmix-4-1').attr('disabled','disabled');
        $('.kc-item').removeAttr('disabled');
        energyTotalValue = tDc;
        kcFinalValue = kcValue;
    }else{
        $('#img-f-energia-total').attr('src','imgs/f_emixto.png');
        $('.kcmix-item').removeAttr('disabled');
        $('.kc-item').attr('disabled', 'disabled');
        kcValue = 0;
        energyTotalValue = tDc+(tAc/(1-kcMixtoValue));
        kcFinalValue = kcMixtoValue;
    }
        
    $('#tDcValue').text(tDc.toFixed(2));
    $('#tAcValue').text(tAc.toFixed(2));
    $('#tPotenCC').text(tPotenCC.toFixed(2));
    $('#tPotenCA').text(tPotenCA.toFixed(2));
    
    tRendimiento = ((1-kbValue-kcValue-krValue-kvValue)*(1-(kaValue*(nDaysValue/pdValue)))).toFixed(3);
    $('#tRValue').text(tRendimiento);
        
    tEnerCampo = (energyTotalValue / tRendimiento).toFixed(2);
    $('#eToNeValue').text(tEnerCampo);
    
    tPotenciaPico = (tEnerCampo/(hspValue * rpValue)).toFixed(2);
    $('#tPpicoValue').text(tPotenciaPico);
    
    numPSerieValue = (tnsValue / tnpValue).toFixed(2);
    $('#tPsValue').text(numPSerieValue);
    
    numPParalelo = (tPotenciaPico / (numPSerieValue * pnpValue)).toFixed(2);
    $('#tPpValue').text(numPParalelo);
    
    numTpaneles = (numPSerieValue * numPParalelo).toFixed(2);
    $('#tPanelValue').text(numTpaneles);
    
    capUtilBatValue = (tEnerCampo * nDaysValue).toFixed(2);
    $('#tCapUtilValue').text(capUtilBatValue);
    
    capNomBatValue = (capUtilBatValue / pdValue).toFixed(2);
    capNomBatFinValue = capNomBatValue;
    $('#tCapNomValue').text(capNomBatValue);
    
    if(tempMed < 20){
        ktValue = (1 - ((20-tempMed)/160)).toFixed(2);
        capNomBatCorecValue = (capNomBatValue / ktValue).toFixed(2);
        capNomBatFinValue = capNomBatCorecValue;
    }/* else{
            capNomBatCorecValue = capNomBatValue;
    } */
    $('#tCapNomCorrecValue').text(capNomBatCorecValue);
    
    capBatAmpHora = (capNomBatFinValue / tnsValue).toFixed(2);
    $('#tCBatValue').text(capBatAmpHora);
    
    numBatSerieValue = (tnsValue / tnBatValue).toFixed(2);
    $('#tBatSerieValue').text(numBatSerieValue);
        
    numBatParaValue = (capBatAmpHora / capNomBatFabricaValue).toFixed(2);
    $('#tBatParaValue').text(numBatParaValue);
    
    numBatTotalValue = (numBatSerieValue * numBatParaValue).toFixed(2);
    $('#tBatTotalValue').text(numBatTotalValue);
    
    igValue  = (1.25 * numPParalelo * iccpValue).toFixed(2);
    $('#tIntenGenValue').text(igValue);
    $('#iNomRegValue').text(igValue);
    
    if(iciTypeValue == 1){
        iciValue = (tPotenCC / tnsValue).toFixed(2);
    }else{
        iciValue = ((tPotenCC / tnsValue)+(tPotenCA / (tnsValue * (1 - kcFinalValue)))).toFixed(2);
    }
    $('#iConInvValue').text(iciValue);
        
    pInInver = (tPotenCA / (1 - kcFinalValue)).toFixed(2);
    $('#rInvValue').text(1 - kcFinalValue);
    $('#pInvValue').text(pInInver);
}

$(document).ready(function(){

    calculos();

    /* registrar cambios en nombre panel (panelName) */
    $(document).on('keyup', '#panelName', panelMoChange);
    function panelMoChange(e){
        panelModel = e.target.value;
        $('#panModel').text(panelModel);
    }

    /* registar cambios en nombre bateria (bateriName) */
    $(document).on('keyup', '#bateriName', batMoChange);
    function batMoChange(e){
        batModel = e.target.value;
        $('#batModel').text(batModel);
    }
    /* registrar cambios en nombre inversor (inversorName) */
    $(document).on('keyup', '#inversorName', inverMoChange);
    function inverMoChange(e){
        invModel = e.target.value;
        $('#invModel').text(invModel);
    }

    

    /* registrar cambios temperatura media (tempMed) */
    $(document).on('keyup change', '.temp-item', tempMedChange);
    function tempMedChange(e){
        let idEvent = e.target.id;
        if(idEvent == 'tempMed-1'){
            $('#correct-tem').toggleClass('oculto');
            $('#container-capa-nom-bat-correc').toggleClass('oculto');
            $('#tempMed-2-1').val(0).attr('disabled',true);
            tempMed = Number(e.target.value);
        }else{
            tempMed = 0;
            $('#correct-tem').toggleClass('oculto');
            $('#container-capa-nom-bat-correc').toggleClass('oculto');
            $('#tempMed-2-1').attr('disabled',false)
            .val('')
            .on('keyup change', function(){
                tempMed = Number($(this).val());
                $('#tMedValue').text(tempMed);
                calculos();
            });
        }
        $('#tMedValue').text(tempMed);
        calculos();
    }
    
    /* registrar cambios en los datos de la instalacion tabla consumos */
    $(document).on('keyup change', '#body-table', '.datosConsum', calculos);
    
    /* registrar cambios valor potencia nominal panel (pnp) */
    $(document).on('keyup change', '.pnp-item', pnpChange);
    function pnpChange(e){
        pnpValue = Number(e.target.value);
        $('#pPicoPanelValue').text(pnpValue);
        calculos();
    }
    
    /* registar cambios valor tension nominal panel (tnp) */
    $(document).on('keyup change', '.tnp-item', tnpChange);
    function tnpChange(e){
        tnpValue = Number(e.target.value);
        $('#tenNomPan').text(tnpValue);
        calculos();
    }
    /* registrar cambio valor de tension nominal del sistema (tns) */
    $(document).on('change', '.tns-item', tnsChange);
    function tnsChange(e){
        tnsValue = Number(e.target.value);
        $('#tTnsValue').text(tnsValue);
        $('#tNomRegValue').text(tnsValue);
        calculos();
    }
    /* registrar cambios en el coeficiente kb */
    $(document).on('change', '.kb-item', kbChange);
    function kbChange(e){
        kbValue = Number(e.target.value);
        calculos();
    }
    /* registrar cambios en el coeficiente ka */
    $(document).on('change', '.ka-item', kaChange);
    function kaChange(e){
        kaValue = Number(e.target.value);
        calculos();
    }
    /* registrar cambios en el coeficiente kr */
    $(document).on('change', '.kr-item', krChange);
    function krChange(e){
        let idEvent = e.target.id;
        if(idEvent == 'kr-1' || idEvent == 'kr-2'){
            $('#kr-3-1').val(0).attr('disabled',true);
            krValue = Number(e.target.value);
        }else{
            krValue = 0;
            $('#kr-3-1').attr('disabled',false)
            .val('')
            .on('keyup change', function(){
                krValue = Number($(this).val());
                calculos();
            });
        }
        calculos();
    }
    /* registrar cambios en el coeficiente kc para consumo mixto */
    $(document).on('change', '.kcmix-item', kcMixtoChange);
    function kcMixtoChange(e){
        let idEvent = e.target.id;
        if(idEvent == 'kcmix-1' || idEvent == 'kcmix-2' || idEvent == 'kcmix-3'){
            $('#kcmix-4-1').val(0).attr('disabled','disabled');
            kcMixtoValue = Number(e.target.value);
        }else{
            kcMixtoValue = 0;
            $('#kcmix-4-1').removeAttr('disabled')
            .val('')
            .on('keyup change', function(){
                kcMixtoValue = Number($(this).val());
                calculos();
            });
        }
        calculos();
    }
    /* registrar cambios en el coeficiente kc */
    $(document).on('change', '.kc-item', kcChange);
    function kcChange(e){
        let idEvent = e.target.id;
        if(idEvent == 'kc-1' || idEvent == 'kc-2' || idEvent == 'kc-3'){
            $('#kc-4-1').val(0).attr('disabled',true);
            kcValue = Number(e.target.value);
        }else{
            kcValue = 0;
            $('#kc-4-1').attr('disabled',false)
            .val('')
            .on('keyup change', function(){
                kcValue = Number($(this).val());
                calculos();
            });
        }
        calculos();
    }
    /* registrar cambios en el coeficiente kv */
    $(document).on('change', '.kv-item', kvChange);
    function kvChange(e){
        let idEvent = e.target.id;
        if(idEvent == 'kv-1'){
            $('#kv-2-1').val(0).attr('disabled',true);
            kvValue = Number(e.target.value);
        }else{
            kvValue = 0;
            $('#kv-2-1').attr('disabled',false)
            .val('')
            .on('keyup change', function(){
                kvValue = Number($(this).val());
                calculos();
            });
        }
        calculos();
    }
    /* registrar cambios en el coeficiente pd */
    $(document).on('change', '.pd-item', pdChange);
    function pdChange(e){
        pdValue = Number(e.target.value);
        calculos();
    }
    /* registrar cambios en numero de dias sin sol*/
    $(document).on('change', '.nDays-item', nDaysChange);
    function nDaysChange(e){
        let newValue = e.target.value;
        nDaysValue = newValue;
        $('#label-nDays').text(newValue);
        calculos();
    }
    /* registrar cambios en horas sol pico (hsp) */
    $(document).on('keyup change', '.hsp-item', hspChange);
    function hspChange(e){
        hspValue = Number(e.target.value);
        $('#tHspValue').text(hspValue);
        calculos();
    }
    /* registrar cambios en rendimiento paneles rp */
    $(document).on('change', '.rp-item', rpChange);
    function rpChange(e){
        let idEvent = e.target.id;
        if(idEvent == 'rp-1'){
            $('#rp-2-1').val(0).attr('disabled',true);
            rpValue = Number(e.target.value);
        }else{
            rpValue = 0;
            $('#rp-2-1').attr('disabled',false)
            .val('')
            .on('keyup change', function(){
                rpValue = Number($(this).val());
                $('#rpPanFab').text(rpValue);
                calculos();
            });
        }
        $('#rpPanFab').text(rpValue);
        calculos();
    }
    /* registrar cambios en tension nominal batarias (tnBat) */
    $(document).on('keyup change', '#tnBat-1', tnBatChange);
    function tnBatChange(e){
        tnBatValue = Number(e.target.value);
        $('#tenNomBatFab').text(tnBatValue);
        calculos();
    }
    /* registrar cambios en capacidad nominal baterias (cnBat) */
    $(document).on('keyup change', '#cnBat-1', cnBatChange);
    function cnBatChange(e){
        capNomBatFabricaValue = Number(e.target.value);
        $('#capNomBatFab').text(capNomBatFabricaValue);
        calculos();
    }
    /* registrar cambios en intensidad cortocircuito panel (ig) */
    $(document).on('keyup change', '#iccp-1', iccpChange);
    function iccpChange(e){
        iccpValue = Number(e.target.value);
        $('#int-corto').text(iccpValue.toFixed(2));
        calculos();
    }
    /* registrar cambios tipo conexion inversor (ici) */
    $(document).on('change', '.ici-item', iciChange);
    function iciChange(e){
        iciTypeValue = e.target.value;
        if(iciTypeValue == 2){
            $('#img-f-consum-inver').attr('src','imgs/f_invconecreg.png');
            $('#inv-conec').text('Conectado a Regulador');
        }else{
            $('#img-f-consum-inver').attr('src','imgs/f_invconecbat.png');
            $('#inv-conec').text('Conectado a Batería');
        }
        calculos();
    }
});