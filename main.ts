// jede po černý je zapotřebí udělat zatáčení 

// asi by šlo udělat měření rychlost otačení kola / obvod kola 
//piny
const pinC = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13


//motory
const m1 = PCAmotor.Motors.M1
const m4 = PCAmotor.Motors.M4

//hodnoty
let whiteLine: number = 0
const data: any[] = []



pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

pins.setPull(encoderL, PinPullMode.PullNone)
pins.setPull(encoderR, PinPullMode.PullNone)
function car_motor(lw: number = 0, rw: number = 0) {
    const ul = Math.map(lw, -100, 100, -255, 255)
    const ur = Math.map(rw, -100, 100, -215, 215)
    PCAmotor.MotorRun(PCAmotor.Motors.M1, ur)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, ul)

}


function history(c :boolean,l: boolean,r:boolean){
    data.push({c,l,r})

    if(data.length > 9){
        data.pop()
    }
}


basic.forever(function () {
    let c: boolean = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true ;
    let l: boolean = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true;
    let r: boolean = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true;

    
    

    basic.pause(100)
    

    // rovná jízda po čáře
    if (c === true || l === true || r === true){
        car_motor(-200,100)
    }else{
        car_motor(0,0)
    }

})
