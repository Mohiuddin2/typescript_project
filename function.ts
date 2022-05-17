function add(n1: number, n2: number) {
    return n1 + n2;
}

function printResult(num: number) {
    console.log("Print-Result: ", + num)
    
}

let combineValues: (a: number, b: number) => 
number
combineValues = add;
// combineValues = printResult;


function addHandle(num1: number, num2: number, cb: (num: number) => void) {
    let result = num1 + num2;
    cb(result);
}

const a = addHandle(50, 50, (result) => {
    console.log(result);
})



printResult(combineValues(30, 20))
