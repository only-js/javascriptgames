
    document.getElementById("start").onclick = start;
    var movements = 0;
    var move = document.getElementById("move");
    move.innerHTML = movements;
    var completed = 0;
    var complete = document.getElementById("complete");
    complete.innerHTML = completed;
    var hiddenImage;
    var seenTime = Number(document.getElementById("time").value)*1000;    //The time before hiding images
    var flag = 0;
    var elementHolder1;
    var elementHolder2;
    
    function start() {
        movements = 0;
        move.innerHTML = movements;

        completed = 0;
        complete.innerHTML = completed;

        seenTime = Number(document.getElementById("time").value)*1000;
        flag = 0;
        setOrder();
        window.clearTimeout(hiddenImage);
        resetOpacity(); //If you push start button more than 1 , you need to reset opacity. otherwise all images will be hidden!!
        loadImages();
        addClick();
    }

        
    


    //Make elements of game
    var main = document.getElementById("main");

    for(var i=0 ; i<16 ; i++){
        main.innerHTML += '<div class="part"><div class="item"></div></div>';
    }

    var items = document.getElementsByClassName("item");

    //Address of images
    var images =["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg","8.jpeg",
                 "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg"];
    var order = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

    //Randomize order of Images
    //Randomize order in order array
    function setOrder(){

        var temp = [];
        var rand;

        var imagesLength = images.length;
        var orderLength = order.length;

        for(var i=0 ; i<imagesLength ; i++){
            rand = Math.floor(Math.random()*images.length);
            temp.push(images.splice(rand, 1)[0]);
        }

        images = temp;
        temp = [];

        for(var i=0 ; i<orderLength ; i++){
            rand = Math.floor(Math.random()*order.length);
            temp.push(order.splice(rand, 1)[0]);
        }

        order = temp;
        temp = null;
    }



    function loadImages(){
        for(var k=0 ; k<items.length ; k++){
            items[k].style.backgroundImage = "url('images/" + images[order[k]] + "')";
        }
        hiddenImage = setTimeout(function(){
            for(var k=0 ; k<items.length ; k++){
            items[k].style.opacity = "0";
        }
        }, seenTime);
    }


    function addClick(){
        for(var k=0 ; k<items.length ; k++){
            items[k].onclick = check;
        }
    }


    function resetOpacity(){
        for(var k=0 ; k<items.length ; k++){
            items[k].style.opacity = "1";
    }
    }

    function check(event){
        movements++;
        move.innerHTML = movements;

        if(flag == 0){
            elementHolder1 = event.target;
            elementHolder1.style.opacity = "1";
            flag = 1;
        }
        else if(flag == 1){
            elementHolder2 = event.target;
            elementHolder2.style.opacity = "1";
            if(elementHolder1.style.backgroundImage == elementHolder2.style.backgroundImage)
            {
                elementHolder1.onclick = "";
                elementHolder2.onclick = "";
                completed++;
                complete.innerHTML = completed;
                if(completed == 8){
                    alert("You win!")
                }
                console.log("ok");
                flag = 0;
            }
            else {
                console.log("no");
                flag = 0;
                setTimeout(function(){
                    elementHolder1.style.opacity = "0";
                    elementHolder2.style.opacity = "0";
                }, 300);
            }
        }
    }
