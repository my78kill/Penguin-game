const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let penguinImg = new Image()
penguinImg.src = "penguin.png"

let bg = new Image()
bg.src = "background.png"

let penguin={
x:120,
y:200,
w:60,
h:60,
vy:0
}

let gravity=0.5
let jump=-11

let poles=[]
let speed=4
let score=0
let gameover=false

function spawnPole(){

let difficulty=Math.random()

let gap=200

if(difficulty>0.7) gap=140
if(difficulty>0.9) gap=110

let top=Math.random()*300+50

poles.push({
x:canvas.width,
top:top,
bottom:top+gap
})

}

setInterval(spawnPole,1800)

document.getElementById("jumpBtn").onclick=()=>{
penguin.vy=jump
}

function update(){

if(gameover) return

penguin.vy+=gravity
penguin.y+=penguin.vy

poles.forEach(p=>{
p.x-=speed

if(
penguin.x < p.x+60 &&
penguin.x+penguin.w > p.x &&
(penguin.y < p.top || penguin.y+penguin.h > p.bottom)
){
endGame()
}

})

score++

}

function draw(){

ctx.drawImage(bg,0,0,canvas.width,canvas.height)

ctx.drawImage(
penguinImg,
penguin.x,
penguin.y,
penguin.w,
penguin.h
)

ctx.fillStyle="green"

poles.forEach(p=>{

ctx.fillRect(p.x,0,60,p.top)
ctx.fillRect(p.x,p.bottom,60,canvas.height)

})

ctx.fillStyle="black"
ctx.font="30px Arial"
ctx.fillText("Score "+score,20,40)

}

function loop(){

update()
draw()

requestAnimationFrame(loop)

}

loop()

function endGame(){

gameover=true

document.getElementById("gameover").style.display="block"

}

function restart(){

location.reload()

}

function shareScore(){

TelegramGameProxy.shareScore()

}