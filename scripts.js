//select the canvas
const canvas = document.querySelector('#draw')
//setting the width and height so that it takes the whole window
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//set the context or as I call it drawing page
const ctx = canvas.getContext('2d')

//Now we are ready for drawing but
//b4 that we need to pick our right brush
//we want a brush with roundy stroke & a ink
ctx.strokeStyle = 'salmon'
ctx.lineJoin = "round"
ctx.lineCap = 'round'
ctx.lineWidth = 25


//Note that our hand is actually the mouse
//so we need to find a way to control it
//we will do that by setting flag 
//we control our mouse position by X and Y co-ordinates
let isDraw = false
let lastX = 0
let lastY = 0

let hue = 0
let isLargeSize = true
//Now let's define drawing
const draw = function (e) {
    if (!isDraw) return //this will make it to stop when isDraw is true


    //Real business here

    //A Part
    ctx.beginPath() //start our journey
    ctx.moveTo(lastX, lastY) //from
    ctx.lineTo(e.offsetX, e.offsetY) //to
    ctx.stroke() //the actual stroke

    //B Part (we don't want our X and Y to always start from 0,0)
    // [lastX, lastY] = [e.offsetX, e.offsetY]
    lastX = e.offsetX
    lastY = e.offsetY

    //C Part
    //This is to change the ink color according to hue
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    hue++
    if (hue >= 360) hue = 0

    //D Part
    //This is to change the width of the brush according to hue
    // ctx.lineWidth = hue
    //Now we want to fade itself to back
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) isLargeSize = !isLargeSize //toggle the linewidth
    if (isLargeSize) {
        ctx.lineWidth++
    } else {
        ctx.lineWidth--
    }
}


//attach events to this fn
canvas.addEventListener('mousedown', (e) => { //you can draw only after clicking as we set the flag true
    isDraw = true

    /*start from different point each time mouse is clicked*/
    lastX = e.offsetX
    lastY = e.offsetY
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => { //as you moveup the mouse button we disable the drawing by setting the flag to false
    isDraw = false
})
canvas.addEventListener('mouseout', () => {
    isDrawing = false
});