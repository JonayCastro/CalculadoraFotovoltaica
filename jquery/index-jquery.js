$(document).ready(function(){
    
    
    $(document).on('click', '#in-date', setDate);

    function setDate(){
        let today = new Date().toISOString().substr(0,10);
        $('#in-date').val(today);
    }

    $(document).on('click', '#print-btn', function(){
        let slideSections = Array.from(document.getElementsByClassName('slide-seccion'));
        slideSections.forEach(element => {
            element.open = true;
        });
        let inDate = document.getElementById('in-date');
        if(inDate.value === '') setDate();
        window.print();
    });

    var rows = 1;

    /* funcion para sumar filas a la tabla de datos */
    $(document).on('click', '#add-row',function(){
        rows++;
        let html = $('.table-consum-row').html();

        let tr = document.createElement('tr');
        tr.classList.add('table-consum-row');
        tr.id = 'consum-row-'+rows;
        tr.innerHTML = html;
        
        $('#body-table').append(tr);
        $('#consum-row-'+rows).hide().fadeIn(500);
        
        /* $('#body-table').append(('<tr class="table-consum-row" id="consum-row-'+rows+'">'+html+'</tr>')); */
    });

    /* funcion para eleminiar filas de la tabla de consumos */
    $(document).on('click','#del-row', function(){
        if(rows>1){
            $('#body-table tr:last').remove();
            calculos();
            rows--;
        }
    });

    
});