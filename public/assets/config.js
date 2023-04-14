console.log("hi react")
const myEvent = new CustomEvent("MY_TEST",  {'detail': 123})
document.dispatchEvent(myEvent)

function sayMesg(mesg){
    alert(mesg)
}

class SignatureConfig{
    constructor(){
        console.log("hi react")
    }
}