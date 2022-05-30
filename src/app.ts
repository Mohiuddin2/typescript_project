
// function Logger(logString: string) {
//     return function(constructor: Function) {
//         console.log(logString)
//         console.log(constructor)
//     }
// }

// function WithTempplate(template: string, hookId:string){
//     return function(constructor: any) {
//         console.log("Template Loging..2")
//         const hookEl = document.getElementById(hookId);
//         const p = new constructor()
//         if(hookEl) {
//             hookEl.innerHTML = template 
//             hookEl.querySelector('h1')!.textContent = p.name;
//         }
//     }
// }



// @Logger("First Decorator -1")
// @WithTempplate("<h1>My Person Object</h1>", "app")
// class Person {
//     name = "Mohammed";

//     constructor() {
//         console.log("Creating Person object..." + this.name)
//     }
// }

// const per = new Person()

// console.log(per)
// function Log(target: any, propertyName: string | Symbol) {
//     console.log("Property Decorator")
//     console.log(target, propertyName)
// }

// function Log2(target: any, name: string, description: PropertyDescriptor) {
//     console.log("Accessor decorator");
//     console.log(name);
//     console.log(target);
//     console.log(description)
// }

// function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
//     console.log("Method decorator");
//     console.log(name);
//     console.log(target);
//     console.log(descriptor)
// }

// function Log4(target: any, name: string | Symbol, position: number ){
//     console.log("Parameter decorator");
//     console.log(name); 
//     console.log(target);
//     console.log("Position", position)
// }

// class Product {
//     @Log
//     title: string;
//     private _price: number;

//     @Log2
//     set price(val: number) {
//         if (val > 0) {
//             if (val > 0) {
//                 this._price = val
//             } else {
//                 throw new Error("Invalid price should be positive")
//             }
//         }
//     }

//     constructor(t: string, p: number) {
//         this.title = t;
//         this._price = p;
//     }
//     @Log3
//     getPrinceWithTax(@Log4 tax: number) {
//         return this._price * (1 + tax)
//     }
// }

// function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//     const orignalMethod = descriptor.value;
//     const adjDescriptor: PropertyDescriptor = {
//        configurable: true,
//        enumerable: false,
//         get() {
//             const boundFn = orignalMethod.bind(this);
//             return boundFn;
//         }
//     }
//     return adjDescriptor;
// }



// class Printer {
//     message = "This Works";
//     @Autobind
//     showMessage() {
//         console.log(this.message)
//     }
// }

// const p = new Printer()

// const button = document.querySelector('button')!;

// button.addEventListener('click', p.showMessage)

interface ValidatorConfig {
    [property: string]: {
        [validateProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {};

function Require(target: any, porpName: string) {
    registeredValidators[target.constructor.name] = {
        [porpName]: ['required']
    }
}


function Positive(target: any, porpName: string) {
    registeredValidators[target.constructor.name] = {
        [porpName]: ['positive']
    }
}
function Validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    };
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    return !!obj[prop];
                case 'positive':
                    return obj[prop] > 0;
            }
        }
    }
}

class Course {
    @Require
    title: string;
    @Positive
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    };

}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createCourse = new Course(title, price);
    if (!Validate(createCourse)) {
        alert('Invalid input, Please try again');
        return;
    }
    console.log(createCourse)

})