function deepEquals(obj1, obj2) {
    if(typeof obj1 === "object" && typeof obj2 === "object"){
        const keys1 = Object.keys(obj1)
        const keys2 = Object.keys(obj2)
        if(keys1.length === keys2.length){
            for (let i = 0; i < keys1.length; i++){
                const key = keys1[i]
                if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object'){
                    if(deepEquals(obj1[key], obj2[key])){

                    }else{
                        console.log("gone at 12")
                        return false
                    }
                }
                else{
                    if(obj1[key] === obj2[key]){

                    }else {
                        console.log("gone at 20")
                        return false
                    }
                }
            }
            console.log("true at 25")
            return true
        }
        else{
            console.log("gone at 29")
            return false
        }
    }
    else{
        if(obj1 === obj2){
            console.log("true at 35")
            return true
        }
        else{
            console.log("gone at 39")
            return false
        }
    }
}

var o = {"name":"k"}
var r = {'name':"k"}
console.log(deepEquals(o, r))

var l = {"name1":"k"}
var k = {"name":"k"}
console.log(deepEquals(l, k))

var t = 5
var s = 6
console.log(deepEquals(t, s))

var c = 5
console.log(deepEquals(c, t))

console.log(deepEquals(c, o))