const rocket = document.querySelector('#rocket')
const canvose = document.querySelector('.canvose')
const cover = document.querySelector('.cover')
const score = document.querySelector(".score")
const hightscore = document.querySelector(".hightscore")
const pause = document.querySelector(".pause")
const play = document.querySelector(".play")
let dscore = 0
let topa;
let ifapss = false 
play.addEventListener('click',()=>{
    ifapss = false
})
window.addEventListener("keydown",(e)=>{
    // console.log(e)
    const lefta = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"))
    if(e.key === "ArrowRight"  && lefta < 340){
        rocket.style.backgroundColor = '#666';
        rocket.style.left = lefta +10 + "px";
        // console.log(lefta)
    }
    if(e.key === 'ArrowLeft' && lefta > 0){
        rocket.style.left = lefta - 10 + "px";
    }

    // Bulletes 

    if(e.key === 'ArrowUp'){
        let bullet = document.createElement("div")
        bullet.classList.add("bullet")
        canvose.appendChild(bullet)

        const moveBulletes = setInterval(()=>{
            for (let i = 0; i < rocks.length; i++) {
                const el = rocks[i];
                if(el != undefined){
                    let rockbound = el.getBoundingClientRect();
                    let bulletbound = bullet.getBoundingClientRect()
                    if(bulletbound.left >= rockbound.left
                        && bulletbound.right <= rockbound.right
                        && bulletbound.top <= rockbound.top
                        && bulletbound.bottom <= rockbound.bottom){
                            el.parentElement.removeChild(el)
                            score.innerHTML = parseInt(score.innerHTML) + 1
                            dscore = dscore + 1  
                        }
                    }
                let bulletmove = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"))
                bullet.style.left = lefta + 20 + 'px'
                bullet.style.bottom = bulletmove + 9 +'px'
                if(bulletmove >= 500){
                    clearInterval(moveBulletes)
                }
                
            }
        })
        
    }
})
// handel pause Event
pause.addEventListener('click',()=>{
    ifapss = true;
    console.log(ifapss)
})

// generate Rockes
let genraterocks = setInterval(()=>{
    let rock = document.createElement("div");
    rock.classList.add('rocks')
    rock.style.left = Math.floor(Math.random()*330) + 'px';
    cover.appendChild(rock);
},1500)

let rocks = document.getElementsByClassName('rocks')
// Move Rockes
let moverokes = setInterval(()=>{
   

    if(rocks != undefined && !ifapss ){
       for(let i =0 ; i< rocks.length; i++){
         let rock = rocks[i]
topa = parseInt(window.getComputedStyle(rock).getPropertyValue("top"))

        if(topa >= 400){
            alert("Game Over")
            clearInterval(moverokes)
            score.innerHTML = 0
            let dhighscore = 0
            if (dscore > dhighscore){
                localStorage.setItem("dscore",JSON.stringify(dscore))
                dhighscore = dscore + 1

            }
            setTimeout(()=>{
                window.location.reload();
            },500)
            
            
        }
        rock.style.top = topa +10 +'px'
        

       }
    }
    if(ifapss){
        let element ;
        for (let i = 0; i< rocks.length; i++) {
         element = rocks[i];    
        }
        element.style.top = topa +10 +'px'
        element.style.bottom = topa-500 + 10 + 'px'
    }
},500)
// Handel session storage
let dsscore = localStorage.getItem("dscore")
hightscore.innerHTML = dsscore
console.log(dsscore)