

const pinC = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13

pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)


let center: Number = pins.digitalReadPin(pinC)
let left: Number = pins.digitalReadPin(pinL)
let right: Number = pins.digitalReadPin(pinR)

basic.forever(function () {
	
})
