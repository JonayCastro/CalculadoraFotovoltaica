$(document).ready(function(){
    /* funcion para plegar y desplegar las secciones */
    $(document).on('click', '.fas', function(){
        $(this).parent().next('div').slideToggle(500);
        $(this).toggleClass('fa-caret-up').toggleClass('fa-caret-down');
        
        $('html, body').animate({
            scrollTop:$(this).offset().top
        },500);
    });

    $(document).on('click', '#in-date', function(){
        let today = new Date().toISOString().substr(0,10);
        $(this).val(today);
    })
    
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

    $(document).on('click', '#btn-export', function(){
        window.print();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#btn-top').fadeIn();
        } else {
            $('#btn-top').fadeOut();
        }
    });
});