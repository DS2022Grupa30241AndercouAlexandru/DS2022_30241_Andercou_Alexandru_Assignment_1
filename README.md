# DS2022_30241_Andercou_Alexandru_Assignment_1

Folderele unde se afla aplicatiile sunt: energy-utility-platform_angular3 pentru aplicatia front-end angular si spring-demo pentru aplicatia server,back-end java. 

Angular js

Aplicatia angular ruleaza in 2 moduri , modul de development folosind comanda: ng serve ,si production  folosind ng build. 
Aplicatia ruleaza default pe portul 4200
Dependintele aplicatiei energy-utility-platform sunt :
Node.js ,angular/cli , angular-datatables,chart.js,jquery,ng-charts.js,ng2-charts,rxjs,tslib,zone.js.
Dependinte care se afla in fisierul : package.json , angular.json, 
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css pentru awesome-font se afla in fisierul index.html 


Java Spring Boot

Aplicatia ruleaza default pe portul 8080
Aplicatia java-spring este o aplicatie java maven. 
Cu dependintele in fisierul pom.xml 
si informatii de tip resurse ale aplicatie(precum informatiile bazei de date,user,password, portul aplicatiei, ,cont pentru aplicatie de tip email)  
in spring demo/src/main/resources/application.propeties .  
Pentru rulare se poate folosi comanda mvn package care genereaza un fisier .jar.
Aplicatia se poate porni cu java –jar ds-2022-0.0.1-SNAPSHOT.jar sau dintr-un ide precum intelij /eclipse. 

Baza de date postgreeSQL e pe portul 5431, user_name:postgres, parola:1234,


Docker
O alta metoda de rulare a aplicatiei este folosind docker. 
Pentru a crea containerele docker , se merge in folserele root ale aplicatilor  java si angular
si se foloseste din terminal  comanda docker build .
Care genereaza o imagine din fisierul Dockerfile. 
Pentru a crea si a porni un container se foloseste comanda docker-compose up –d care genereaza un container folosind fisierul docker-compose.yml  
