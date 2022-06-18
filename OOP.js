function Person(name, age, addres) {
    this.name = name;
    this.age = age;
    this.addres = addres;
}

Person.prototype.introduce  = function () {
    console.log(`mening ismim ${this.name}, ${this.age}, ${this.addres} da`);
}

const shaxs = new Person("Shahriyor", 23, "Jizzax", 25);
const shaxs2 = new Person("Sanjar", 24, "Jizzax");

const person2 = {
        name: 'sardor'
}
