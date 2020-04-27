function countB(str){
    count = 0
    for(i in str) {
        if (str.charAt(i) === "B"){
            count++;
        }
    }
    return count
}

console.log(countB("BoB"))

function countChar(str, chr){
    count = 0
    if(chr.length == 1){
        for (i in str){
            if(str.charAt(i) === chr ) {
                count++
            }
        }
        return count
    }
    else{
        return "Enter a 1 length char"
    }
}

console.log(countChar("Bob", "B"))
console.log(countChar("ajdlajd", "ahda"))