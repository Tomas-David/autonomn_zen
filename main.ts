// jede po černý je zapotřebí udělat zatáčení 


//piny
const pinC = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13


//motory
const m1 = PCAmotor.Motors.M1
const m4 = PCAmotor.Motors.M4

//hodnoty
let whiteLine: number = 0
let dataL: any[] = []
let dataC: number[] = []
let dataR: any[] = []



pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

function car_motor(lw: number = 0, rw: number = 0) {
    const ul = Math.map(lw, -100, 100, -255, 255)
    const ur = Math.map(rw, -100, 100, -215, 215)
    PCAmotor.MotorRun(PCAmotor.Motors.M1, ur)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -ul)

}




function isOnLineC(){
    let value: number = 0
      
    for (let i = 0; i < 5; i++) {
        value += dataC[i]
    }

    if (Math.round(value / 5) === 1) {
        return false
    } else {
        return true
    }
}


function isOnLineL() {
    let value: number = 0
    
    for (let i = 0; i < 5; i++) {
        value += dataL[i]
    }

    if (Math.round(value / 5) === 1) {
        return false
    } else {
        return true
    }
}


function isOnLineR() {
    let value: number = 0

    for (let i = 0; i < 5; i++) {
        value += dataR[i]
    }

    if (Math.round(value / 5) === 1){
        return false
    }else{
        return true
    }


}


function appendValuesC(c : boolean){
    let count: number = 0
    let convertC: number = 0

    while (count <= 5) {
        if (c === true) {
            convertC = 1
            dataC.push(convertC)
        } else {
            convertC = 0
            dataC.push(convertC)
        }


        if (dataC.length > 5) {
            dataC.pop()
        }

        count++
    }
    return dataC
}



function appendValuesL(l: boolean) {
    let count: number = 0
    let convertL: number = 0

    while (count <= 5) {
        if (l === true) {
            convertL = 1
            dataL.push(convertL)
        } else {
            convertL = 0
            dataL.push(convertL)
        }


        if (dataL.length > 5) {
            dataL.pop()
        }

        count++
    }
    return dataL
}


function appendValuesR(r: boolean) {
    let count: number = 0
    let convertR: number = 0

    while (count <= 5) {
        if (r === true) {
            convertR = 1
            dataL.push(convertR)
        } else {
            convertR = 0
            dataR.push(convertR)
        }


        if (dataR.length > 5) {
            dataR.pop()
        }

        count++
    }
    return dataR
}







basic.forever(function () {
    let c: boolean = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true ;
    let l: boolean = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true;
    let r: boolean = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true;

    appendValuesC(c)
    appendValuesL(l)
    appendValuesR(r)
    

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
        car_motor(125, 40)

    } else if (c === false && l === false && r === true){
        car_motor(125, 40)
    }else{
       c = isOnLineC()
       l = isOnLineL()
       r = isOnLineR()

       if(c === false && l === false && r === false){
           car_motor(0,0)
       }
    }

    
    
})



