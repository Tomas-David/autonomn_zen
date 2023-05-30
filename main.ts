
//piny
const pinC = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13
//motory
const m1 = PCAmotor.Motors.M1
const m4 = PCAmotor.Motors.M4
//hodnoty
let whiteLine: number = 0

pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)




basic.forever(function () {
    let c: boolean = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true ;
    let l: boolean = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true;
    let r: boolean = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true;

    basic.pause(100)
    
    if (c === true || l === true || r === true){
        PCAmotor.MotorRun(m1, 100)
        PCAmotor.MotorRun(m4, -200)
    }else{
        PCAmotor.MotorRun(m1, 0)
        PCAmotor.MotorRun(m4, 0)
    }

})
