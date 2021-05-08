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
    }]);