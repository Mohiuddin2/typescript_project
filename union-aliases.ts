type Combine = number | string
type ConversionDescriptor = 'as-number' | 'as-text'

function combine(a: Combine, b: Combine, resutlConversion: ConversionDescriptor ) {
    let results;
    if (typeof a === 'number' && typeof b === 'number' || resutlConversion === 'as-number') {
        results = +a + +b;
    } else {
        results = a.toString() + b.toString();

    }
    return results;
    // if (resutlConversion === 'as-number') {
    //     return +results;
    // } else {
    //     return results.toString();
    // }
     
}

const combinedAges = combine(30, 30, 'as-number')
console.log(combinedAges)

const combinedStringAges = combine('30', '26', 'as-number')

console.log(combinedStringAges)

const combineNames = combine("Mohi", "Uddin", 'as-text')
console.log(combineNames)