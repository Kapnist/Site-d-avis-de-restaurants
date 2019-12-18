// creation de la variable contenant tout mes restaurants
var restaurant =[
   {
    "restaurantName": "BRONCO",
    "address":"39 RUE DES PETITES ECURIE, 75010 PARIS",
    "lat": 48.8737815,
    "long": 2.3501649,
    "ratings":[
        {
            "stars":2,
            "comment":"Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande.",
        },
        {
            "stars":1,
            "comment":"Tout simplement mon restaurant préféré !",
        }
    ]
   },
   {
      "restaurantName":"BABALOU",
      "address":"4 RUE LAMARCK, 75018 PARIS",
      "lat":48.8865035,
      "long":2.3442197,
      "ratings":[
         {
            "stars":5,
            "comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !",
         },
         {
            "stars":3,
            "comment":"J'ai trouvé ça correct, sans plus"
         }
      ]
   },
   
   {
      "restaurantName":"BOUTEBRIE",
      "address":"15, RUE DE LA PARCHEMINERIE",
      "lat":48.851629,
      "long":2.344985,
      "ratings":[
         {
            "stars":4,
            "comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !",
         },
         {
            "stars":2,
            "comment":"J'ai trouvé ça correct, sans plus",
         }
      ]
   },

   {
      "restaurantName":"CLIGNANCOURT",
      "address":"14-16, SQUARE CLIGNANCOURT",
      "lat":48.893493,
      "long":2.347233,
      "ratings":[
         {
            "stars":5,
            "comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
         },
         {
            "stars":4,
            "comment":"J'ai trouvé ça correct, sans plus"
         }
    ]
    }, 
    {   
            "restaurantName":"ANDRE MALRAUX",
            "address":"112, RUE DE RENNES",
             "lat":48.847869,
             "long":2.327529,
             "ratings":[
         {
            "stars":1,
            "comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !",
         },
         {
            "stars":3,
            "comment":"J'ai trouvé ça correct, sans plus",
         }
      ]
   },
    {
    "restaurantName": "le cocotier",
    "address":"39 RUE DES PETITES ECURIE, 75010 PARIS",
    "lat": 48.5,
    "long": 2.2,
    "ratings":[
        {
            "stars":4,
            "comment":"Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande.",
        },
        {
            "stars":5,
            "comment":"Tout simplement mon restaurant préféré !",
        }
    ]
   }
  
];

var nbRestaurant =restaurant.length;
const selectStars= document.getElementsByClassName("nbEtoile")
var streetview= document.getElementById("photos");
var description= document.getElementById("description");


// initialisation de la map
var iniplace={lat:48.8737815 , lng:2.3501649}

var map;
var service;
var infowindow;

function initMap() {
    // centrons notre carte sur les restaurants parisien
    map = new google.maps.Map( document.getElementById('map'), {zoom: 11, center: iniplace});


    for(var i=0; i<nbRestaurant; i++){ // on incrémente les coordonnées de nos restaurants pour les placer sur ma map
        var latRestaurant=restaurant[i].lat;
        var longiRestaurant=restaurant[i].long ;

        //console.log(latRestaurant, longiRestaurant); // test

        var restaurantPlace= {lat: latRestaurant, lng: longiRestaurant};// coordonnée de  paris      
        var allrestaurant = restaurantPlace[i];
        // positionnons nos marqueur sur nos restaurants
        var marker = new google.maps.Marker({position: restaurantPlace, map: map});
        var allRestaurant=[restaurantPlace.lat,restaurantPlace.lng]
    }  

   // autocomplete================

     google.maps.event.addDomListener(window, 'load', initialize);
   
    function initialize() {
      var input = document.getElementById('autocomplete_search');
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();  // Lorsque vous sélectionnez un résultat de saisie semi-automatique, l'exemple appelle ensuite la getPlace() méthode, puis ouvre une fenêtre d'informations pour afficher les détails du lieu.
      // place variable will have all the information you are looking for.
      $('#lat').val(place.geometry['location'].lat());
      $('#long').val(place.geometry['location'].lng());
      
      });
      
    }
  
 
  
// Evenement click sur le bouton recherche et qui permet d'ajouter un marqueur à l'adresse saisie.
    var buttonRecherche=document.getElementsByClassName("recherche");      
        buttonRecherche[0].addEventListener("click", function(e){
           
    var lieu=document.getElementsByClassName("form-control")[0].value;
    var request = {
          query: lieu,
          fields: ['name', 'geometry'],
        };

    var service = new google.maps.places.PlacesService(map);
        
        service.findPlaceFromQuery(request, function(results, status) {
        //console.log(status)
        //console.log(results)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for(var i = 0; i < results.length; i++) {
        // console.log(results[i].geometry.location.lat)
          var pos1 = {
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng(),
              };
          var newIcon ={ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"} // personalison le Marker de l'utilisateur
           map = new google.maps.Map( document.getElementById('map'), {zoom: 11, center: pos1});
          var marker2 = new google.maps.Marker({position: pos1, map: map, icon: newIcon});
                      
          // function qui permet d'ajouter les marqueurs de retaurants sur ma carte et autour de l'adresse saisie.
          var pyrmont = new google.maps.LatLng(results[i].geometry.location.lat(),results[i].geometry.location.lng());
          var request = {
                location: pyrmont,
                radius: '5000',
                type: ['restaurant']
              };
          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
                      
          // Creation de notre marqueur 
          infowindow = new google.maps.InfoWindow();
          function createMarker(place) {
            var marker = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location
                });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
                              
            });
          }
          //Appel de la function callback
          function callback(results, status) {
            streetview.innerHTML="";
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for(var i = 0; i < results.length; i++) {
                    var place = results[i];
                    createMarker(results[i]);
                    var nomRestau=results[i].name;
                    var adresse=results[i].vicinity
                    var photo=document.createElement("img");
                        photo.src=results[i].photos[0].getUrl();
                    var note=results[i].rating;

                    // ajout de nos restaurant sur la liste à droite
                    var newBoxImageCom=document.createElement('div'); 
                        newBoxImageCom.classList.add('boxImageCom'); 
                    var NewElementImage= document.createElement('div');
                    var newRestaurantImage= document.createElement('img');
                        newRestaurantImage.src = results[i].photos[0].getUrl();
                        newRestaurantImage.style.height="300px";
                        newRestaurantImage.style.width="350px";
                        NewElementImage.appendChild(newRestaurantImage); // on ajoute l'image du restaurant à la div
                    var moyenneNewRestaurant= document.createElement("p");
                        moyenneNewRestaurant.classList.add("moyennePara");
                        moyenneNewRestaurant.textContent=note;
                        NewElementImage.appendChild( moyenneNewRestaurant); // on ajoute notre moyenne à l'image
                    var nomNewRestaurant =  document.createElement("p");
                        nomNewRestaurant.textContent=nomRestau;
                        NewElementImage.appendChild( nomNewRestaurant); 
                    var newAdresse= document.createElement("p");
                        newAdresse.textContent=adresse;
                        NewElementImage.appendChild(newAdresse); 
                              
                                      
                    var NewCommentaire=document.createElement("div")
                        NewCommentaire.classList.add("cacherCommentaires")
                        NewCommentaire.style.marginLeft="20px";
                                  
                    // ajoutons des paragraphes
                    var paranul =  document.createElement("p");
                        paranul.classList.add("nbEtoile")
                        paranul.textContent=""
                        NewCommentaire.appendChild(paranul);
                    var paranul1 =  document.createElement("p");
                        paranul1.textContent=""
                        NewCommentaire.appendChild(paranul1);
                    var paranul2 =  document.createElement("p");
                        paranul2.classList.add("nbEtoile")
                        paranul2.textContent=""
                        NewCommentaire.appendChild(paranul2); 
                    var paranul3 =  document.createElement("p");
                        paranul3.textContent=""
                        NewCommentaire.appendChild(paranul3);
                    var paragrapheNote =  document.createElement("p");
                        paragrapheNote.classList.add("nbEtoile")
                        NewCommentaire.appendChild(paragrapheNote);
                    var paragrapheComment =  document.createElement("p");
                        paragrapheComment.classList.add("paragrapheTextarea")
                        NewCommentaire.appendChild(paragrapheComment);
                    var paranul4 =  document.createElement("p");
                        paranul4.classList.add("nbAvis")
                        paranul4.textContent=0;
                    var paranul5 =  document.createElement("p");
                        paranul5.classList.add('sommeTotale')
                        paranul5.textContent=0
                                     
                    // création dun selecteur
                    var select = document.createElement('select');
                    var option1 = document.createElement('option');
                        un= document.createTextNode("1");
                        option1.appendChild(un);
                    var option15 = document.createElement('option');
                        unDemi= document.createTextNode("1.5");
                        option15.appendChild(unDemi);
                    var option2 = document.createElement('option');
                        deux= document.createTextNode("2");
                        option2.appendChild(deux);
                    var option25 = document.createElement('option');
                        deuxDemi= document.createTextNode("2.5");
                        option25.appendChild(deuxDemi);
                    var option3 = document.createElement('option');
                        trois= document.createTextNode("3");
                        option3.appendChild(trois);
                    var option35 = document.createElement('option');
                        troisDemi= document.createTextNode("3.5");
                        option35.appendChild(troisDemi);
                    var option4 = document.createElement('option');
                        quatre= document.createTextNode("4");
                        option4.appendChild(quatre);
                    var option45 = document.createElement('option');
                        quatreDemi= document.createTextNode("4.5");
                        option45.appendChild(quatreDemi);
                    var option5 = document.createElement('option');
                        cinq= document.createTextNode("5");
                        option5.appendChild(cinq);
                                      
                                     
                        select.appendChild(option1);
                        select.appendChild(option15);
                        select.appendChild(option2);
                        select.appendChild(option25);
                        select.appendChild(option3);
                        select.appendChild(option35);
                        select.appendChild(option4);
                        select.appendChild(option45);
                        select.appendChild(option5);

                    var texte=document.createElement("textarea")
                        texte.textContent="A recommander"
                    var button=document.createElement("BUTTON")
                        button.classList.add("buttonCommentaire");
                        button.textContent="Envoyer"


                                      
                        NewCommentaire.appendChild(select);
                        NewCommentaire.appendChild(texte)
                        NewCommentaire.appendChild(button)
                        NewCommentaire.appendChild(paranul4);
                        NewCommentaire.appendChild(paranul5);

                        newBoxImageCom.appendChild(NewElementImage);
                        newBoxImageCom.appendChild(NewCommentaire);

                        // récupérons les coordonnées de nos restaurant pour les utiliser par la suite dans notre filtre
                        var coordonnéesNewRestau= document.createElement('div');
                            coordonnéesNewRestau.classList.add("coordonnées")
                        var newCoordonnéesX= document.createElement('p');
                            newCoordonnéesX.textContent = results[i].geometry.location.lat(); //position x
                        var newCoordonnéesY= document.createElement('p');
                            newCoordonnéesY.textContent = results[i].geometry.location.lng(); // position Y
                            coordonnéesNewRestau.appendChild(newCoordonnéesX)
                            coordonnéesNewRestau.appendChild(newCoordonnéesY)
                            newBoxImageCom.appendChild(coordonnéesNewRestau);       
                        
                        streetview.appendChild(newBoxImageCom);
                          //Ajoutons un marqueur spécifique
                        marqueurspécifique()
                       
                           document.getElementsByClassName('cacherCommentaires')[i].style.display="none"
                        

                        // Ajout de la possibilité de commenter
                        document.getElementById("photos").children[i].addEventListener('click',function(){
                          getComment()
                        });
                         // ajout de la possibilité d'envoyer son commentaire
                        document.getElementById("photos").children[i].childNodes[1].childNodes[8].addEventListener("click", function(e){ // click du button envoi
                          gérerClickEnvoi()
                        });
                      }
                    }
                  }
                }       
              } 
              transformStars();
                        
                        transformStarsMoyenne(); 
            });
                
          })

            
   // geolocalisation de mon utilisateur
   infoWindow = new google.maps.InfoWindow();

   // Utilisons le HTML5 geolocation.
   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var newIcon ={ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"} // personalison le Marker de l'utilisateur
            var marker2 = new google.maps.Marker({position: pos, map: map, icon: newIcon});
            
            infoWindow.open(map);
            map.setCenter(pos);
        }, 
        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
         handleLocationError(false, infoWindow, map.getCenter());
    }

//======================partie2 fonction qui permet d'ajouter un marqueur en cliquant sur ma map ====================== 
    google.maps.event.addListener(map, 'click', function (event) {
        new google.maps.Marker({
        map: map,
        position: event.latLng
        });
        var newRestaurantlatitude=event.latLng.lat(); // latitude au point cliqué
        var newRestaurantlongitude=event.latLng.lng(); // longitude au point cliqué
        var newBoxImageCom=document.createElement('div'); 
            newBoxImageCom.classList.add('boxImageCom'); 
        var NewElementImage= document.createElement('div');
                  
        var newRestaurantImage= document.createElement('img');
            newRestaurantImage.src =" "//"https://maps.googleapis.com/maps/api/streetview?size=300x300&location="+newRestaurantlatitude+","+newRestaurantlongitude+"&heading=151.78&pitch=-0.76&key=AIzaSyAsbTqUtfDTb3mx7cFtYjkmOm6pV1G9eCE"; 
            NewElementImage.appendChild(newRestaurantImage); // on ajoute l'image du restaurant à la div
        var moyenneNewRestaurant= document.createElement("p");
            moyenneNewRestaurant.classList.add("moyennePara");
            moyenneNewRestaurant.textContent="Moyenne";
            NewElementImage.appendChild( moyenneNewRestaurant); // on ajoute notre moyenne à l'image
        var nomNewRestaurant =  document.createElement("p");
            nomNewRestaurant.textContent="Nom du restaurant";
            NewElementImage.appendChild( nomNewRestaurant); 
        var newAdresse= document.createElement("p");
            newAdresse.textContent="Adresse du restaurant";
            NewElementImage.appendChild(newAdresse); 
    
            
        var NewCommentaire=document.createElement("div")
            NewCommentaire.classList.add("cacherCommentaires")
            NewCommentaire.style.marginLeft="20px";
        
        // ajoutons des paragraphes
        var paranul =  document.createElement("p");
            paranul.classList.add("nbEtoile")
        paranul.textContent=""
            NewCommentaire.appendChild(paranul);
         var paranul1 =  document.createElement("p");
        paranul1.textContent=""
            NewCommentaire.appendChild(paranul1);
        var paranul2 =  document.createElement("p");
            paranul2.classList.add("nbEtoile")
         paranul2.textContent=""
           NewCommentaire.appendChild(paranul2); 
        var paranul3 =  document.createElement("p");
         paranul3.textContent=""
         NewCommentaire.appendChild(paranul3);
        var paragrapheNote =  document.createElement("p");
            paragrapheNote.classList.add("nbEtoile")
            NewCommentaire.appendChild(paragrapheNote);
        var paragrapheComment =  document.createElement("p");
            paragrapheComment.classList.add("paragrapheTextarea")
            NewCommentaire.appendChild(paragrapheComment);
        var paranul4 =  document.createElement("p");
            paranul4.classList.add("nbAvis")
            paranul4.textContent=0;
        var paranul5 =  document.createElement("p");
            paranul5.classList.add('sommeTotale')
         paranul5.textContent=0
           
            // création dun selecteur
            var select = document.createElement('select');
            var option1 = document.createElement('option');
                un= document.createTextNode("1");
                option1.appendChild(un);
            var option15 = document.createElement('option');
                unDemi= document.createTextNode("1.5");
                option15.appendChild(unDemi);
            var option2 = document.createElement('option');
                deux= document.createTextNode("2");
                option2.appendChild(deux);
            var option25 = document.createElement('option');
                deuxDemi= document.createTextNode("2.5");
                option25.appendChild(deuxDemi);
            var option3 = document.createElement('option');
                trois= document.createTextNode("3");
                option3.appendChild(trois);
            var option35 = document.createElement('option');
                troisDemi= document.createTextNode("3.5");
                option35.appendChild(troisDemi);
            var option4 = document.createElement('option');
                quatre= document.createTextNode("4");
                option4.appendChild(quatre);
            var option45 = document.createElement('option');
                quatreDemi= document.createTextNode("4.5");
                option45.appendChild(quatreDemi);
            var option5 = document.createElement('option');
                cinq= document.createTextNode("5");
                option5.appendChild(cinq);
            
           
            select.appendChild(option1);
            select.appendChild(option15);
            select.appendChild(option2);
            select.appendChild(option25);
            select.appendChild(option3);
            select.appendChild(option35);
            select.appendChild(option4);
            select.appendChild(option45);
            select.appendChild(option5);

            var texte=document.createElement("textarea")
            texte.textContent="A recommander"
            var button=document.createElement("BUTTON")
            button.classList.add("buttonCommentaire");
            button.textContent="Envoyer"


            
            NewCommentaire.appendChild(select);
            NewCommentaire.appendChild(texte)
            NewCommentaire.appendChild(button)
            NewCommentaire.appendChild(paranul4);
            NewCommentaire.appendChild(paranul5);

            newBoxImageCom.appendChild(NewElementImage);
            newBoxImageCom.appendChild(NewCommentaire);

            // récupérons les coordonnées de nos restaurant pour les utiliser par la suite dans notre filtre
            var coordonnéesNewRestau= document.createElement('div');
                coordonnéesNewRestau.classList.add("coordonnées")
            var newCoordonnéesX= document.createElement('p');
                newCoordonnéesX.textContent = newRestaurantlatitude //position x
            var newCoordonnéesY= document.createElement('p');
                newCoordonnéesY.textContent = newRestaurantlongitude // position Y
            coordonnéesNewRestau.appendChild(newCoordonnéesX)
            coordonnéesNewRestau.appendChild(newCoordonnéesY)
            newBoxImageCom.appendChild(coordonnéesNewRestau); 
            streetview.appendChild(newBoxImageCom);
            //console.log(event.latLng.lat());

            // ajout de l'evenement click
            document.getElementById("photos").lastChild.addEventListener('click',function(){
              getComment()
           }); // on ajoute l'évenement click sur les images.
           document.getElementById("photos").lastChild.childNodes[1].childNodes[8].addEventListener("click", function(e){ // click du button envoi
             gérerClickEnvoi()
           });
            
           //console.log("text ajout evenement")
        //===================== appel de notre function popPup ========================================
        function openForm() { 
            document.getElementById("myForm").style.display = "block";
        }
        openForm()   
      
    });
    
     //ajout d'un evenemnt click sur mon bouton
      
}
   

// fonction qui personalise mon marker de geolocalisation

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
       'Error: The Geolocation service failed.' :
       'Error: Your browser doesn\'t support geolocation.');
                

    infoWindow.open(map);
    
    // ajout d'un marquer
    var marquer2=new google.maps.Marker({
        position: pos, 
        map: map
    });
               
}
          
 // définition de notre fonction
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.setRequestHeader("Accept", "Access-Control-Allow-Origin")
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

   // req.addEventListener("error", function () {
     //   console.error("Erreur réseau avec l'URL " + url);
   // });
    req.send(null);
};




    
     // on incrémente les coordonnées de nos restaurants pour les placer sur ma map
var nbCommentaires=document.getElementsByClassName("cacherCommentaires")
function getAllRestaurant(){
   for(var i=0; i<nbRestaurant; i++){
        var boxImageCom= document.createElement('div');
        var latRestaurant   =[restaurant[i].lat];
        var longiRestaurant =[restaurant[i].long] ;
        var commentaire     = restaurant[i].comment ;
        //console.log("test22222222222",latRestaurant,longiRestaurant)     
        var elementImage=document.createElement('div');        
        
        // on recupère les images statiques grâce à nos positions
        var nbImage= document.createElement('img');
            
        var restaurantPlace= {lat: latRestaurant, lng: longiRestaurant};
           
            nbImage.src =" "//"https://maps.googleapis.com/maps/api/streetview?size=300x300&location="+restaurant[i].lat+","+restaurant[i].long+"&heading=151.78&pitch=-0.76&key=AIzaSyAUQYy3SyrOfDvFWPwL71oa7B1rjq4zBak"; 
        // récupérons les coordonnées de nos restaurant pour les utiliser par la suite dans notre filtre
        var coordonnéesRestau= document.createElement('div');
            coordonnéesRestau.classList.add("coordonnées")
        var coordonnéesX= document.createElement('p');
            coordonnéesX.textContent=(restaurant[i].lat) //position x
        var coordonnéesY= document.createElement('p');
            coordonnéesY.textContent=(restaurant[i].long) // position Y
        coordonnéesRestau.appendChild(coordonnéesX)
        coordonnéesRestau.appendChild(coordonnéesY)
         
   
        elementImage.appendChild(nbImage);
        
        //elementImage.appendChild(coordonnéesRestau);
        //console.log("testttttttttttt666666666666"+restaurant[i].lat+","+restaurant[i].long)
        
        // ajoutons les informations sur le restaurant(nom, adresse, commentaire et nombre d'étoiles)
        var nomRestaurant= document.createElement("p");
            nomRestaurant.textContent = restaurant[i].restaurantName;
        var adresseResto = document.createElement("p");
            adresseResto.textContent=restaurant[i].address
          
        boxImageCom.appendChild(elementImage);
        var commentaires= document.createElement("div");
            commentaires.classList.add('cacherCommentaires');
        var nbCommentaires=document.getElementsByClassName("cacherCommentaires");
        
        for(var k=0; k<restaurant[i].ratings.length; k++){ 
            var etoile= document.createElement("p")
                etoile.classList.add("nbEtoile");
                
            var commentaire= document.createElement("p");
                commentaire.textContent=restaurant[i].ratings[k].comment;
                etoile.textContent=restaurant[i].ratings[k].stars;
                commentaires.appendChild(etoile) // ajoute d'etoile à la div commentaires
                commentaires.appendChild(commentaire); //ajout de commentaire

            var sommes=restaurant[i].ratings[0].stars +restaurant[i].ratings[1].stars;
                moyenne=sommes/restaurant[i].ratings.length
           // console.log(moyenne+"goooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood")
            var moyennePara =  document.createElement("p");
                moyennePara.classList.add("moyennePara")
                moyennePara.textContent=moyenne;
            var moyenneNum =  document.createElement("p");
                moyenneNum.classList.add("moyenneNum");
                moyenneNum.textContent=moyenne;
        }
        elementImage.appendChild(moyennePara); //moyenne de restaurant
        elementImage.appendChild(moyenneNum)
        elementImage.appendChild(nomRestaurant); //ajout du nom du restaurant
        elementImage.appendChild(adresseResto); //ajout de l'adresse
        boxImageCom.appendChild(commentaires); // ajout de la div commentaire à boxImage
        boxImageCom.appendChild(coordonnéesRestau)
        boxImageCom.classList.add("boxImageCom");
        streetview.appendChild(boxImageCom); //ajout de boxImage à la streetview;
            
        
            
        //==========laisser un commentaire===========Parti 2 ========
        var btn = document.createElement("div");        // Créer un élément <button>
        btn.classList.add('buttonCommentaire');
        var selectEtoile=document.getElementsByClassName("classEtoile")
            
        var boutonEnvoi= document.createElement("BUTTON")
        boutonEnvoi.classList.add("buttonEnvoi")
        var t = document.createTextNode("Envoyer");       // Créer un noeud textuel
        boutonEnvoi.appendChild(t); 
        var paragrapheTextarea= document.createElement("p"); 
            paragrapheTextarea.classList.add("paragrapheTextarea") 
        var paragrapheEtoile= document.createElement("p");   
            paragrapheEtoile.classList.add("nbEtoile")
        var textarea=document.createElement("textarea"); //on crée notre espace de texte
            textarea.classList.add("texte")
            btn.appendChild(boutonEnvoi)
         var sommeTotale= document.createElement("p");   // on calcule automatiquement la somme que l'on stoque 
            sommeTotale.classList.add("sommeTotale")
            sommeTotale.textContent=sommes;
            // Ajouter le selecteur de note de 1 à 5
            var select = document.createElement('select');
            var option1 = document.createElement('option');
                un= document.createTextNode("1");
                option1.appendChild(un);
            var option15 = document.createElement('option');
                unDemi= document.createTextNode("1.5");
                option15.appendChild(unDemi);
            var option2 = document.createElement('option');
                deux= document.createTextNode("2");
                option2.appendChild(deux);
            var option25 = document.createElement('option');
                deuxDemi= document.createTextNode("2.5");
                option25.appendChild(deuxDemi);
            var option3 = document.createElement('option');
                trois= document.createTextNode("3");
                option3.appendChild(trois);
            var option35 = document.createElement('option');
                troisDemi= document.createTextNode("3.5");
                option35.appendChild(troisDemi);
            var option4 = document.createElement('option');
                quatre= document.createTextNode("4");
                option4.appendChild(quatre);
            var option45 = document.createElement('option');
                quatreDemi= document.createTextNode("4.5");
                option45.appendChild(quatreDemi);
            var option5 = document.createElement('option');
                cinq= document.createTextNode("5");
                option5.appendChild(cinq);
            
           
            select.appendChild(option1);
            select.appendChild(option15);
            select.appendChild(option2);
            select.appendChild(option25);
            select.appendChild(option3);
            select.appendChild(option35);
            select.appendChild(option4);
            select.appendChild(option45);
            select.appendChild(option5);
            var nbAvis= document.createElement("p");// on crée un element pour stocquer le nombre de commentaires
                nbAvis.textContent="2"
            nbAvis.classList.add("nbAvis")
            commentaires.appendChild(paragrapheEtoile)
            commentaires.appendChild(paragrapheTextarea)
            commentaires.appendChild(select);
            commentaires.appendChild(textarea); 
            commentaires.appendChild(btn); 
            commentaires.appendChild(nbAvis); 
            commentaires.appendChild(sommeTotale); 
    }
}
getAllRestaurant();


var selectEtoile=document.getElementsByClassName('classEtoile')
// personnaliser les etoile
const zeroEtoile= '<img src="../images/zeroEtoile.png">';
const demiEtoile= '<img src="../images/demiEtoile.png">';
const Etoile= '<img src="../images/uneEtoile.png">';
var moyenneUn=Etoile+zeroEtoile+zeroEtoile+zeroEtoile+zeroEtoile;
var moyenneUnEtDEmi=Etoile+demiEtoile+zeroEtoile+zeroEtoile+zeroEtoile; 
var moyenneDeux=Etoile+Etoile+zeroEtoile+zeroEtoile+zeroEtoile;
var moyenneDeuxEtDemi=Etoile+Etoile+demiEtoile+zeroEtoile+zeroEtoile; 
var moyenneTrois=Etoile+Etoile+Etoile+zeroEtoile+zeroEtoile;
var moyenneTroisEtDemi=Etoile+Etoile+Etoile+demiEtoile+zeroEtoile; 
var moyenneQuatre=Etoile+Etoile+Etoile+Etoile+zeroEtoile;
var moyenneQuatreEtDemi=Etoile+Etoile+Etoile+Etoile+demiEtoile;
var moyenneCinq=Etoile+Etoile+Etoile+Etoile+Etoile;


var nombreAvis=document.getElementsByClassName("nbEtoile").length; // selection des avis ("etoiles")
var nombreImages=document.getElementsByClassName("boxImageCom"); // selection des images
var imageStars= document.getElementsByClassName("nbEtoile");

//===============================transformons nos nombre d'etoile en image========================
function transformStars(){
    for(var i=0; i< imageStars.length; i++){
        if (imageStars[i].textContent==="1") {
            imageStars[i].innerHTML=moyenneUn+" "+imageStars[i].textContent;
        }else if (imageStars[i].textContent==="1.5") {
            imageStars[i].innerHTML=moyenneUnEtDEmi+" "+imageStars[i].textContent;    
        }else if (imageStars[i].textContent==="2") {
            imageStars[i].innerHTML=moyenneDeux+" "+imageStars[i].textContent;
        }else if (imageStars[i].textContent==="2.5") {
            imageStars[i].innerHTML=moyenneDeuxEtDemi+" "+imageStars[i].textContent;    
        }else if (imageStars[i].textContent==="3") {
            imageStars[i].innerHTML= moyenneTrois+" "+imageStars[i].textContent;
        }else if (imageStars[i].textContent==="3.5") {
            imageStars[i].innerHTML=moyenneTroisEtDemi+" "+imageStars[i].textContent;    
        }else if (imageStars[i].textContent==="4") {
            imageStars[i].innerHTML=moyenneQuatre+" "+imageStars[i].textContent;
        }else if (imageStars[i].textContent==="4.5") {
            imageStars[i].innerHTML=moyenneQuatreEtDemi+" "+imageStars[i].textContent;    
        }else if (imageStars[i].textContent==="5") {
            imageStars[i].innerHTML=moyenneCinq+" "+imageStars[i].textContent;
        }
    }
}
transformStars();



// transformation de la moyenne en etoile
var moyenneEtoile=document.getElementsByClassName('moyennePara')

function transformStarsMoyenne(){
    for(var i=0; i< moyenneEtoile.length; i++){
        if ((moyenneEtoile[i].textContent>0)&&(moyenneEtoile[i].textContent<=1.2)) {
            moyenneEtoile[i].innerHTML=moyenneUn+" "+moyenneEtoile[i].textContent;
        }else if ((moyenneEtoile[i].textContent>1.2)&&(moyenneEtoile[i].textContent<=1.7)) {
            moyenneEtoile[i].innerHTML=moyenneUnEtDEmi+" "+moyenneEtoile[i].textContent;    
        }else if ((moyenneEtoile[i].textContent>"1.7")&&(moyenneEtoile[i].textContent<=2.2)) {
            moyenneEtoile[i].innerHTML=moyenneDeux+moyenneEtoile[i].textContent;
        }else if ((moyenneEtoile[i].textContent>2.2)&&(moyenneEtoile[i].textContent<=2.7)) {
            moyenneEtoile[i].innerHTML=moyenneDeuxEtDemi+" "+moyenneEtoile[i].textContent;    
        }else if ((moyenneEtoile[i].textContent>2.7)&&(moyenneEtoile[i].textContent<=3.2)) {
            moyenneEtoile[i].innerHTML=moyenneTrois+moyenneEtoile[i].textContent;
        }else if ((moyenneEtoile[i].textContent>3.2)&&(moyenneEtoile[i].textContent<=3.7)) {
            moyenneEtoile[i].innerHTML=moyenneTroisEtDemi+" "+moyenneEtoile[i].textContent;    
        }else if ((moyenneEtoile[i].textContent>3.7)&&(moyenneEtoile[i].textContent<=4.2)) {
            moyenneEtoile[i].innerHTML=moyenneQuatre+moyenneEtoile[i].textContent;
        }else if ((moyenneEtoile[i].textContent>4.2)&&(moyenneEtoile[i].textContent<4.7)) {
            moyenneEtoile[i].innerHTML=moyenneQuatreEtDemi+" "+moyenneEtoile[i].textContent;    
        }else if (moyenneEtoile[i].textContent>=4.7) {
            moyenneEtoile[i].innerHTML=moyenneCinq+moyenneEtoile[i].textContent;
        }else if (moyenneEtoile[i].textContent==="Etoile") {
            moyenneEtoile[i].innerHTML=moyenneDeuxEtDemi+" "+moyenneEtoile[i].textContent;    
        }else if(moyenneEtoile[i].textContent==="Note"){
            moyenneEtoile[i].innerHTML=moyenneDeuxEtDemi+" "+moyenneEtoile[i].textContent; 
        }else{
            ""
        }
    }

}
transformStarsMoyenne();
// on rajoute un marqueur spécifique à nos images.
function marqueurspécifique(){
  for(var i=0; i<$('.boxImageCom').length; i++){
    if (($('.moyennePara')[i].lastChild.nodeValue>=1)&&($('.moyennePara')[i].lastChild.nodeValue<1.7)) {
      $('.boxImageCom')[i].className="boxImageCom";// on reinitialise la class avant de lui attribuer le nouveau marquer
      $('.boxImageCom')[i].classList.add("uneEtoiles");
    }else if (($('.moyennePara')[i].lastChild.nodeValue>=2)&&($('.moyennePara')[i].lastChild.nodeValue<2.7)) {
      $('.boxImageCom')[i].className="boxImageCom";
      $('.boxImageCom')[i].classList.add("deuxEtoiles");
    }else if (($('.moyennePara')[i].lastChild.nodeValue>=3)&&($('.moyennePara')[i].lastChild.nodeValue<3.7)) {
      $('.boxImageCom')[i].className="boxImageCom";
      $('.boxImageCom')[i].classList.add("troisEtoiles");
    }else if (($('.moyennePara')[i].lastChild.nodeValue>=4)&&($('.moyennePara')[i].lastChild.nodeValue<4.7)){
      $('.boxImageCom')[i].className="boxImageCom";
      $('.boxImageCom')[i].classList.add("quatreEtoiles");
    } else if (($('.moyennePara')[i].lastChild.nodeValue>=4.7)) {
      $('.boxImageCom')[i].className="boxImageCom";
      $('.boxImageCom')[i].classList.add("cinqEtoiles");
    }
  }
  transformStarsMoyenne();
}
marqueurspécifique()


//Ajoutons notre filtre a notre application==================================================


  $(".Filtre").on('click', function filtre(){
      var filtreResto=$('.select')[0].value // valeur de notre etoile
      
      // On reinitialise la map
      for(var i=0; i<$('.boxImageCom').length; i++){
              var posX=Number($('.boxImageCom')[i].children[2].children[0].textContent)
              var posY=Number($('.boxImageCom')[i].children[2].children[1].textContent)


              // on repositionne les marqueurs
              var filtreRestaurantPlace= {
                lat: posX, 
                lng: posY,
              };
            }
            if ($('.form-control')[0].value=="") {
              var map = new google.maps.Map( document.getElementById('map'), {zoom: 11, center: iniplace});
            }else{
              var map = new google.maps.Map( document.getElementById('map'), {zoom: 11, center: filtreRestaurantPlace});
            }
      if (filtreResto == "Tous les restaurants") { // on affiche tout nos boxImageCom
          for(var n=0; n<$('.boxImageCom').length; n++){
            $('.boxImageCom')[n].style.display="block"; 
            $('.boxImageCom')[n].style.display= "flex";  // on rajoute le display flex pour pas qu le cahecomm s'affiche en bas
             // position de nos marque
            for(var i=0; i<$('.boxImageCom').length; i++){
              var posX=Number($('.boxImageCom')[i].children[2].children[0].textContent)
              var posY=Number($('.boxImageCom')[i].children[2].children[1].textContent)


              // on repositionne les marqueurs
              var filtreRestaurantPlace= {
                lat: posX, 
                lng: posY,
              };

              // On positionne les nouveaux marqueurs
              var markerFiltré = new google.maps.Marker({position: filtreRestaurantPlace, map: map});
              console.log(filtreRestaurantPlace)
            }
          }      
                 
      }else if (filtreResto == "1 Etoile") { // on affiche tout nos boxImageCom
          for(var i=0; i<$('.boxImageCom').length; i++){
              $('.boxImageCom')[i].style.display="none"; 
            }
          for(var n=0; n<$('.uneEtoiles').length; n++){
            $(".uneEtoiles")[n].style.display= "block";
            $('.uneEtoiles')[n].style.display= "flex";  // on rajoute le display flex pour pas qu le cahecomm s'affiche en bas
             // position de nos marque
            for(var i=0; i<$('.uneEtoiles').length; i++){
              var posX=Number($('.uneEtoiles')[i].children[2].children[0].textContent)
              var posY=Number($('.uneEtoiles')[i].children[2].children[1].textContent)


              // on repositionne les marqueurs
              var filtreRestaurantPlace= {
                lat: posX, 
                lng: posY,
              };

              // On positionne les nouveaux marqueurs
              var markerFiltré = new google.maps.Marker({position: filtreRestaurantPlace, map: map});
              console.log(filtreRestaurantPlace)
            }
          }      
                 
      }else if (filtreResto == "2 Etoiles") { // on affiche tout nos boxImageCom
          for(var i=0; i<$('.boxImageCom').length; i++){
              $('.boxImageCom')[i].style.display="none"; 
            }
          for(var n=0; n<$('.deuxEtoiles').length; n++){
            $(".deuxEtoiles")[n].style.display= "block";
            $('.deuxEtoiles')[n].style.display= "flex";  // on rajoute le display flex pour pas qu le cahecomm s'affiche en bas
             // position de nos marque
            for(var i=0; i<$('.deuxEtoiles').length; i++){
              var posX=Number($('.deuxEtoiles')[i].children[2].children[0].textContent)
              var posY=Number($('.deuxEtoiles')[i].children[2].children[1].textContent)


              // on repositionne les marqueurs
              var filtreRestaurantPlace= {
                lat: posX, 
                lng: posY,
              };

              // On positionne les nouveaux marqueurs
              var markerFiltré = new google.maps.Marker({position: filtreRestaurantPlace, map: map});
              console.log(filtreRestaurantPlace)
            }
          }      
                 
      }else if (filtreResto == "3 Etoiles") { // on affiche tout nos boxImageCom
          for(var i=0; i<$('.boxImageCom').length; i++){
              $('.boxImageCom')[i].style.display="none"; 
            }
          for(var n=0; n<$('.troisEtoiles').length; n++){
            $(".troisEtoiles")[n].style.display= "block";
            $('.troisEtoiles')[n].style.display= "flex";  // on rajoute le display flex pour pas qu le cahecomm s'affiche en bas
             // position de nos marque
            for(var i=0; i<$('.troisEtoiles').length; i++){
              var posX=Number($('.troisEtoiles')[i].children[2].children[0].textContent)
              var posY=Number($('.troisEtoiles')[i].children[2].children[1].textContent)


              // on repositionne les marqueurs
              var filtreRestaurantPlace= {
                lat: posX, 
                lng: posY,
              };

              // On positionne les nouveaux marqueurs
              var markerFiltré = new google.maps.Marker({position: filtreRestaurantPlace, map: map});
              console.log(filtreRestaurantPlace)
            }
          }      
                 
      }else if (filtreResto == "4 Etoiles") { // on affiche tout nos boxImageCom
          for(var i=0; i<$('.boxImageCom').length; i++){
              $('.boxImageCom')[i].style.display="none"; 
            }
          for(var n=0; n<$('.quatreEtoiles').length; n++){
            $(".quatreEtoiles")[n].style.display= "block";
            $('.quatreEtoiles')[n].style.display= "flex";  // on rajoute le display flex pour pas qu le cahecomm s'affiche en bas
             // position de nos marque
            for(var i=0; i<$('.quatreEtoiles').length; i++){
              var posX=Number($('.quatreEtoiles')[i].children[2].children[0].textContent)
              var posY=Number($('.quatreEtoiles')[i].children[2].children[1].textContent)


              // on repositionne les marqueurs
              var filtreRestaurantPlace= {
                lat: posX, 
                lng: posY,
              };

              // On positionne les nouveaux marqueurs
              var markerFiltré = new google.maps.Marker({position: filtreRestaurantPlace, map: map});
              console.log(filtreRestaurantPlace)
            }
          }      
                 
      }else if (filtreResto == "5 Etoiles") { // on affiche tout nos boxImageCom
          for(var i=0; i<$('.boxImageCom').length; i++){
              $('.boxImageCom')[i].style.display="none"; 
            }
          for(var n=0; n<$('.cinqEtoiles').length; n++){
            $(".cinqEtoiles")[n].style.display= "block";
            $('.cinqEtoiles')[n].style.display= "flex";  // on rajoute le display flex pour pas qu le cahecomm s'affiche en bas
             // position de nos marque
            for(var i=0; i<$('.cinqEtoiles').length; i++){
              var posX=Number($('.cinqEtoiles')[i].children[2].children[0].textContent)
              var posY=Number($('.cinqEtoiles')[i].children[2].children[1].textContent)


              // on repositionne les marqueurs
              var filtreRestaurantPlace= {
                lat: posX, 
                lng: posY,
              };

              // On positionne les nouveaux marqueurs
              var markerFiltré = new google.maps.Marker({position: filtreRestaurantPlace, map: map});
              console.log(filtreRestaurantPlace)
            }
          }      
                 
      }

      for(var i=0; i< document.getElementsByClassName('cacherCommentaires').length; i++){
         document.getElementsByClassName('cacherCommentaires')[i].style.display="none"
      }

    //======================partie2 fonction qui permet d'ajouter un marqueur en cliquant sur ma map ====================== 
    google.maps.event.addListener(map, 'click', function (event) {
        new google.maps.Marker({
        map: map,
        position: event.latLng
        });
        var newRestaurantlatitude=event.latLng.lat(); // latitude au point cliqué
        var newRestaurantlongitude=event.latLng.lng(); // longitude au point cliqué
        var newBoxImageCom=document.createElement('div'); 
            newBoxImageCom.classList.add('boxImageCom'); 
        var newElementImage= document.createElement('div');
            newElementImage.classList.add('NewElementImage');      
        var newRestaurantImage= document.createElement('img');
            newRestaurantImage.src =" "//"https:maps.googleapis.com/maps/api/streetview?size=300x300&location="+newRestaurantlatitude+","+newRestaurantlongitude+"&heading=151.78&pitch=-0.76&key=AIzaSyAUQYy3SyrOfDvFWPwL71oa7B1rjq4zBak"; 
            newElementImage.appendChild(newRestaurantImage); // on ajoute l'image du restaurant à la div
        
        var moyenneNewRestaurant =  document.createElement("p");
            moyenneNewRestaurant.classList.add("moyennePara");
            moyenneNewRestaurant.textContent="Moyenne";
            newElementImage.appendChild( moyenneNewRestaurant); // on ajoute notre moyenne à l'image
        
        var nomNewRestaurant =  document.createElement("p");
            nomNewRestaurant.textContent="Nom du restaurant";
            newElementImage.appendChild( nomNewRestaurant); 
        
        var newAdresse= document.createElement("p");
            newAdresse.textContent="Adresse du restaurant";
            newElementImage.appendChild(newAdresse); 
    
            
        var newCommentaire=document.createElement("div")
            newCommentaire.style.marginLeft="20px";
        var newComment =  document.createElement("p");
            newComment.textContent="Commentaire laissé";
            newCommentaire.appendChild(newComment);
        var newNote =  document.createElement("p");
            newNote.textContent= "Note";
            newCommentaire.appendChild(newNote);
            newBoxImageCom.appendChild(newElementImage);
            newBoxImageCom.appendChild(newCommentaire);
           
            streetview.appendChild(newBoxImageCom);
            //console.log(event.latLng.lat());

           

        //===================== appel de notre function popPup ========================================
        function openForm() { 
            document.getElementById("myForm").style.display = "block";

        }
        openForm()   
      
    });

});


//============================ajouter un événement click à nos images ===============================
        //==========  on commence par cacher nos commentaire et avis  =====================
for(var i=0; i<nbCommentaires.length; i++){
nbCommentaires[i].style.display = 'none';
}

// function qui gère les clicks d'une photo
var butt=document.getElementsByClassName("buttonEnvoi"); // button d'envoi
var message= document.getElementsByClassName("messageForm")
var forme= document.getElementsByClassName('buttonCommentaire')

// function qui gère les clicks
function getComment(e){ //function qui affiche le block commentaire
          //console.log(event.currentTarget.childNodes);
          event.currentTarget.childNodes[1].style.display = 'block';   
      
      }

//========== function qui gère le clic du button envoie ===============
      
      function gérerClickEnvoi(e){
          var textZoneText="";
          var zone="";
          var zoneTexte=event.currentTarget.parentElement.children[7].value; // commentaire.
          var starsSelection=event.currentTarget.parentElement.children[6].value; // note attribuée
          //var nbAvis=event.currentTarget.parentElement.children[9].textContent; // nombre de  commentaires
            
            etoileZoneText=document.createElement("p")
            etoileZoneText.classList.add('nbEtoile')
            
            etoileZoneText.innerHTML=Number(starsSelection);
            
            textZoneText=document.createElement("p") // creation du paragraphe de commentaire
            textZoneText.classList.add("textRajouté")
            textZoneText.innerHTML=zoneTexte; // on rajoute le texte de notre textearea
            zone=event.currentTarget.parentElement.children[event.currentTarget.parentElement.children.length-1]// Array.prototype.slice le converti en tableau
        var zoneParent=zone.parentNode
            
        var etoileInt=zoneParent.children[zoneParent.children.length-6].appendChild(etoileZoneText)
        var commentInt=zoneParent.children[zoneParent.children.length-6].appendChild(textZoneText)
            
     
          // récuperons la valeur de la note attibuée pour calculer la nouvelle moyenne
        var noteAttribuée=event.currentTarget.parentElement.children[6].value
        var newSomme=Number(event.currentTarget.parentElement.children[10].textContent)+Number(noteAttribuée)
               // console.log(event.currentTarget.parentElement.children[9].textContent+"test 1")
        var dividende=Number(event.currentTarget.parentElement.children[9].textContent)+1;

        var newMoyenne=newSomme/dividende;

        //on actualise la moyenne
        event.currentTarget.parentElement.parentElement.children[0].children[1].childNodes[5].textContent=newMoyenne
        //console.log(event.currentTarget.parentElement.parentElement.children[0].children[1].childNodes[5].textContent+"la vie est belle")
        // modifion la moyenne
          //console.log(event.currentTarget.parentElement.parentElement.children[0].children[1].childNodes[5].textContent)
        //  console.log(newMoyenne+"jjj")
           
        //recupération de la valeur de nos etoiles
        var valeurEtoile=zoneParent.children[event.currentTarget.parentElement.children.length-6].nextElementSibling.firstChild.textContent
        event.currentTarget.parentElement.children[9].textContent=Number(event.currentTarget.parentElement.children[9].textContent)+1;
       

            zoneParent.children[7].value="Votre avis à été bien enregistré !"; 
            zoneParent.children[6].value="2.5";
            
            transformStarsMoyenne();
            
            // on recupère la somme que l'on stoque temporairement le temps de travail
              var somme=event.currentTarget.parentElement.children[10].textContent
              var sommeActualisée=Number(somme)+Number(noteAttribuée);
              event.currentTarget.parentElement.children[10].textContent= Number(event.currentTarget.parentElement.children[10].textContent)+Number(noteAttribuée)
               
            //function qui transforme les etoile de commentaire en de vraies étoiles
          //console.log(event.currentTarget.parentElement.parentElement.childNodes[0]+"test3")
          transformStars()

          // on supprime nos marqueurs classList
          for(var i=0; i<document.getElementsByClassName('boxImageCom').length; i++){
            if (document.getElementsByClassName('boxImageCom')[i].classList.contains("inferieur")) {
                document.getElementsByClassName('boxImageCom')[i].classList.remove("inferieur");
            }else if (  document.getElementsByClassName('boxImageCom')[i].classList.contains("superieur")){
                document.getElementsByClassName('boxImageCom')[i].classList.remove("superieur");
            }
          }   
          // on remet notre marqueur
          marqueurspécifique()
        }

function gérerLesClick(){
    for(var i=0; i<nombreImages.length; i++){
      nombreImages[i].addEventListener('click',function(e){
        getComment(e)
      }) // on ajoute l'évenement click sur les images.
      forme[i].addEventListener("click", function(e){ // click du button envoi
        gérerClickEnvoi(e)
      })
    }   
      
}

   

//function qui actualise la moyenne


//=========================================================================================================
//================================ 2ieme partie "Ajouter un restauarnt"====================================================




function closeForm(){
       
    var nomResto=document.getElementsByClassName("form-container")[0][0].value;
    var adresseNewResto=document.getElementsByClassName("form-container")[0][1].value;
    
   

    // on affecte nos valeurs à notre nouveau restaurant

    var moyenne= document.getElementById("photos").lastChild.children[0].children[1].childNodes[0];
        moyenne.textContent=2.5;
    // on ajoute la class inferieur.
    
    var nomRestauCiblé=document.getElementById("photos").lastChild.children[0].children[2].childNodes[0];
        nomRestauCiblé.textContent=nomResto;
    var adresseRestauCiblé=document.getElementById("photos").lastChild.children[0].children[3].childNodes[0];
        adresseRestauCiblé.textContent=adresseNewResto;
    // ajout etoile
    document.getElementById("photos").lastChild.childNodes[1].childNodes[0].classList.add("nbEtoile") // on ajoute une class


    document.getElementById("photos").lastChild.children[0].nextSibling.style.display="none"

    
    
    
    // on reinitialise notre formulaire
    document.getElementsByClassName("form-container")[0][0].value="";
    document.getElementsByClassName("form-container")[0][1].value="";
    
    

    // on cache notre popPup
    transformStarsMoyenne(); // ON TRANSFORME LA MOYENNE EN DE VRAIES ETOILES
    transformStars();
    document.getElementById("myForm").style.display = "none";
    
    marqueurspécifique() // rappel de notre marqueur spécifique(inferieur, superieur)
    
}
    closeForm()
 gérerLesClick()



