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

input.onButtonPressed(Button.A, function() {
    radio.sendNumber(1)
})

pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

function car_motor(lw: number = 0, rw: number = 0) {
    const ul = Math.map(lw, -100, 100, -255, 255)
    const ur = Math.map(rw, -100, 100, -215, 215)
    PCAmotor.MotorRun(PCAmotor.Motors.M1, ur)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -ul)

}




function isOnLineC() {
    let value: number = 0

    for (let i = 0; i < 3; i++) {
        value += dataC[i]
    }

    if (Math.round(value / 3) === 1) {
        return false
    } else {
        return true
    }
}


function isOnLineL() {
    let value: number = 0

    for (let i = 0; i < 3; i++) {
        value += dataL[i]
    }

    if (Math.round(value / 3) === 1) {
        return false
    } else {
        return true
    }
}


function isOnLineR() {
    let value: number = 0

    for (let i = 0; i < 3; i++) {
        value += dataR[i]
    }

    if (Math.round(value / 3) === 1) {
        return false
    } else {
        return true
    }


}


function appendValuesC(c: boolean) {
    let count: number = 0
    let convertC: number = 0

    while (count <= 3) {
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

        count++
    }
    return dataC
}



function appendValuesL(l: boolean) {
    let count: number = 0
    let convertL: number = 0

    while (count <= 3) {
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

        count++
    }
    return dataL
}


function appendValuesR(r: boolean) {
    let count: number = 0
    let convertR: number = 0

    while (count <= 3) {
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

        count++
    }
    return dataR
}

let turn = false
radio.onReceivedNumber(function (receivedNumber: number) {
    
    switch (receivedNumber) {
        case 1:
            turn = true
            basic.pause(200)
            car_motor(0,90)
            basic.pause(500)
            turn = false
            break
        case 2:
            turn = true
            basic.pause(200)
            car_motor(90, 0)
            basic.pause(500)
            turn = false
            break
    }
})



basic.forever(function () {
