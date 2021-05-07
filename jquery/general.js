$(document).ready(function(){
    /* funcion para plegar y desplegar las secciones */
    $(document).on('click', '.fas', function(){
        $(this).parent().next('div').slideToggle(500);
        $(this).toggleClass('fa-caret-up').toggleClass('fa-caret-down');
        
        $('html, body').animate({
            scrollTop:$(this).offset().top
        },500);

    });

    
    /* var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#in-date').val(today); */
    /* var d = document.getElementById('in-date');
    d.valueAsDate = new Date(); */

    $(document).on('click', '#btn-ctrl-menu', function(){
        $('#menu').slideToggle(500).toggleClass('oculto');
    });

    $(document).on('click', '.btn-menu', function(e){
        if(e.target.innerHTML == 'Cerrar todo'){
            $('.seccion').slideUp(500);
            e.target.innerHTML = 'Expandir todo';
        }else{
            $('.seccion').slideDown(500);
            e.target.innerHTML = 'Cerrar todo';
        }
        $('.fas').toggleClass('fa-caret-up').toggleClass('fa-caret-down');
    });
});