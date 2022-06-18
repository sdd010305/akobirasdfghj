

// window.onload = function () {
//     var clickfunc = document.querySelector('.click');

//     // clickfunc.onclick = function () {
       
//     // }
// // alert('salom-2');

//     // clickfunc.onclick = setBg()
//     // function setBg () {
//     //     clickfunc.style.background = 'green';
//     // }


//         // clickfunc.onclick = function () {
//         //     clickfunc.style.background = 'green';
//         // };

//         // clickfunc.onclick = function () {
//         //     clickfunc.style.color = 'red';
//         // };

//         // clickfunc.addEventListener('click' , function() {
//         //     clickfunc.style.background = 'green';
//         // });


//         // clickfunc.addEventListener('click' , function() {
//         //     clickfunc.style.color = 'red';
//         // });

//         clickfunc.addEventListener('click', setBg);

//         function setBg (){
//             clickfunc.style.color = 'red';
//         }
// }



window.addEventListener('load', function () {

    var clickfunc = document.querySelectorAll('.click');

    // clickfunc.addEventListener('click', function () {
    //         clickfunc.style.color = 'red';
    //         console.log(this);
    // });

    console.log(clickfunc);

    clickfunc[0].addEventListener('click' , function() {
        this.style.color = 'red';
    });

    clickfunc[1].addEventListener('click' , function() {
        this.style.color = 'red';
    });


    for(var i = 0; i < clickfunc.length; i++){
        clickfunc[i].addEventListener('click', function() {
            this.style.color = 'red';
        });
    };

});