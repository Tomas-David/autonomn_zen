radio.setGroup(14)

//piny
const pinC = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13

//motory
const m1 = PCAmotor.Motors.M1
const m4 = PCAmotor.Motors.M4

//hodnoty
let whiteLine: number = 0
let dataL: number[] = []
let dataC: number[] = []
let dataR: number[] = []
let turn = false
let count = 0
pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

function car_motor(lw: number = 0, rw: number = 0) {
    const ul = Math.map(lw, -100, 100, -255, 255)
    const ur = Math.map(rw, -100, 100, -215, 215)
    PCAmotor.MotorRun(PCAmotor.Motors.M1, ur)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -ul)
}


function isOnLine(data: any[]) {
    let value: number = 0

    for (let i = 0; i < 3; i++) {
        value += data[i]
    }

    if (Math.round(value / 3) === 1) {
        return false
    } else {
        return true
    }
}


function appendValuesC(c: boolean) {
      let convertC: number = 0

        if (c === true) {
            convertC = 1
            dataC.push(convertC)
        } else {
            convertC = 0
            dataC.push(convertC)
        }

        if (dataC.length > 3) {
            dataC.pop()
        }
    return dataC
}



function appendValuesL(l: boolean) {
    let convertL: number = 0

        if (l === true) {
            convertL = 1
            dataL.push(convertL)
        } else {
            convertL = 0
            dataL.push(convertL)
        }

        if (dataL.length > 3) {
            dataL.pop()
        }
    return dataL
}


function appendValuesR(r: boolean) {
    let convertR: number = 0
        if (r === true) {
            convertR = 1
            dataL.push(convertR)
        } else {
            convertR = 0
            dataR.push(convertR)
        }
        if (dataR.length > 3) {
            dataR.pop()
        }
    return dataR
}


radio.onReceivedNumber(function (receivedNumber: number) {
    switch (receivedNumber) {
        case 1:
            turn = true
            basic.pause(500)
            car_motor(0,90)
            basic.pause(500)
            turn = false
            break
        case 2:
            turn = true
            basic.pause(500)
            car_motor(90,0)
            basic.pause(500)
            turn = false
            break
        case 3:
            turn = true
            basic.pause(100)
            car_motor(125,65)
            turn = false
            break
    }
})

basic.forever(function () {
    let c: boolean = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true;
    let l: boolean = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true;
    let r: boolean = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true;

    


    if(turn === false){

        while(count <= 5) {
            appendValuesC(c)
            appendValuesL(l)
            appendValuesR(r)
            count++
        }
        
        // rovná jízda po čáře
        
        if (c === true && l === true && r === true || c === true && l != true && r != true){
            car_motor(125,65)
        }else if (c === true && l === false && r === false){
            car_motor(125, 65)
        }else if(c === true && l === true && r === false){
            car_motor(50,65)
        } else if (c === false && l === true && r === false){
            car_motor(50, 65)
        } else if(c === true && l === false && r === true){
            car_motor(125, 10)
        } else if (c === false && l === false && r === true){
            car_motor(125, 10)
        }else{
            c = isOnLine(dataC)
            l = isOnLine(dataL)
            r = isOnLine(dataR)

            if(c === true && l === true && r === true){
            car_motor(0,0)
            }
        }
    }
    
})
