angular.module('angularApp',[])
    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 20;
    }])
    .controller('dataController',['$scope', '$location', '$anchorScroll', function(s,l,a){
        s.kb1 = 0.1;
        s.kb2 = 0.05;
        s.ka1 = 0.02;
        s.ka2 = 0.005;
        s.ka3 = 0.012;
        s.kr1 = 0.1;
        s.kr2 = 0.01;
        s.kc1 = 0.05;
        s.kc2 = 0.1;
        s.kc3 = 0.4;
        s.kv1 = 0.15;
        s.pd1 = 0.5;
        s.pd2 = 0.8;
        s.rp1 = 0.9;
        s.ri1 = 0.9;
        s.tns1 = 12;
        s.tns2 = 24;
        s.tns3 = 48;
        s.tns4 = 120;
        s.tempMed1 = 20;

        s.goToAnchor = (n)=>{
            var newHash = n;
            if (l.hash() !== newHash) {
                l.hash(n);
            } else {
                a();
            }
        }
        var section;
        var containerHide;
        var titleSection;
        s.showSection = (idSection, titulo)=>{
            containerHide = document.getElementById('container-oculto');
            section = document.getElementById(idSection);
            titleSection = document.getElementById('title-section');
            titleSection.textContent = titulo;
            section.style.display = 'block';
            section.style.pointerEvents = 'auto';
            containerHide.style.opacity = 1;
            containerHide.style.pointerEvents = 'auto'
        }

        s.hideSection = ()=>{
            titleSection.textContent = '';
            section.style.display = 'none';
            section.style.pointerEvents = 'none';
            containerHide.style.opacity = 0;
            containerHide.style.pointerEvents = 'none'
        }

        s.openSection = (cell)=>{
            s.goToAnchor('slide-table');
            let slideTable = document.getElementById('slide-table');
            slideTable.open = true;
            let cellSelec = Array.from(document.getElementsByClassName(cell));
            cellSelec.forEach((element)=>{
                element.classList.add('destellear');
            });
            setTimeout(()=>{
                cellSelec.forEach((element)=>{
                    element.classList.remove('destellear');
                });
            },3000);
        }

        s.printProyect = ()=>{
            let slideSections = Array.from(document.getElementsByClassName('slide-seccion'));
            slideSections.forEach(element => {
                element.open = true;
            });
            window.print();
            slideSections.forEach(element => {
                element.open = false;
            });

        }

    }]);