function add(a:number, b:number, c:boolean, phs: string) {
    if (c) {
        console.log(phs+(a+b))
    } else {
        return a-b
    }
}

const n1= 100;
const printres = true;
const str = "The result is: "
add(n1, 10, printres, str)
// console.log(res)