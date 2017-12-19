$(document).ready(function(){

var totaldata=[], evenData = [], oddData = [];

$.ajax({
  //************* for good amount of data****************
  url: "https://parking-1e126.firebaseio.com/other.json", 
  //************* for only 6 data****************
  //url: "https://parking-1e126.firebaseio.com/data.json", 
  dataType:'json',
  cache: false,
  success: function(data){
    console.log(data.length);
    $.each(data , function (key){
      if (data.length > 6) {
        if ((key%2) == 0) {
          evenData.push(data[key]);
        } else {
          oddData.push(data[key]);
        }
      } else {
          totaldata.push(data[key]);
      }
    });
    console.log(evenData , oddData, totaldata);
    if (totaldata.length > 0) {
        $.each(totaldata , function (k){
          addDom(totaldata,k,"flex-item");
        });
    } else {
      $.each(evenData , function (k){
        addDom(evenData,k,"flex-item");
      });
      $.each(oddData , function (k){
        addDom(oddData,k,"flex-itemone");
      });
    }
    
    domMaipulate ();
  }
});

function addDom(data,i,row){
        $( "ul.secondRow" ).append(
          "<li class="+row+">"+
                    "<div class='directory'>"+
                          "<p class='directory-cat'>ACCESS HIRE</p>"+
                          "<div>"+
                              "<img class='img-responsive' src=" + data[i].image +" alt='Company Name'>"+
                          "</div>"+
                          "<div class='overlay'>"+
                              "<div class='directory-ratting'>"+
                                  data[i].rating +
                              "</div>"+
                              "<div class='directory-info-details'>"+
                                  "<p>COMPANY: <span>" +data[i].company+"</span></p>"+
                                  "<p>OPENING HOURS: <span>"+data[i].hours+"</span></p>"+
                                  "<p>LOCATION: <span>"+data[i].location+"</span></p>"+
                                  "<p>PHONE: <span>"+data[i].phone+"</span></p>"+
                              "</div>"+
                          "</div>"+
                      "</div>"+
                    "</li>"
                );
    }
  
 function domMaipulate (){

  var index = 0, windowWidth = parseInt($(window).width());
  var rowone = $('.flex-item');
  console.log(rowone.length); 
  var rowtwo = $('.flex-itemone');
  console.log(rowtwo.length);
  showSlides(index);

  $(".directory-arrowL").click(function(){
      var n = -1;
      index += n;
      $(".directory-arrowR").show();
      showSlides(index);
      if (index < 1) {
        $(this).hide();
      }
  });

  $(".directory-arrowR").click(function(){
      var n = 1;
      index += n;
      $(".directory-arrowL").show();
      showSlides(index);
      if (index == rowone.length - 1) {
        $(this).hide();
      }
  });

  function showSlides(n) {
    if (n >= 0 && n <= rowone.length){
      for (let i = 0; i < rowone.length; i++) {
        $(rowone[i]).css("display", "none"); 
        $(rowtwo[i]).css("display", "none");
      }
    }
    contentShowWidth(windowWidth); 
  }

  function contentShowWidth(w){
    if (w >= 640 && w <= 991) {
      contenShow (2);
    } else if (w > 0 && w < 640){
      contenShow (1);
    } else if (w > 1200) {
      contenShow (4);
    } else {
      contenShow (3);  
    } 
  }

  function contenShow (a){
      for (let i=0; i < a; i++){
        $(rowone[index + i]).css("display", "block");
        $(rowtwo[index + i]).css("display", "block");
        
      }
    }

  $(window).resize(function() {
        for (let i = 0; i < rowone.length; i++) {
        $(rowone[i]).css("display", "none"); 
        $(rowtwo[i]).css("display", "none");
      } 
      windowWidth = parseInt($(window).width());
      contentShowWidth(windowWidth);
    });

 }

});



