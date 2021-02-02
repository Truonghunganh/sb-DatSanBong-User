export class User {
    phone: string;
    password: string;
    constructor(phone: string, password: string) {
        this.phone = phone;
        this.password = password;
    }
 }
export class User1{
    name: string;
    phone: string;
    gmail: string;
    address: string;
    password: string;
    constructor(name: string, phone: string,gmail: string, address: string, password: string) {
        this.name= name;
        this.phone= phone;
        this.gmail=gmail;
        this.address= address;
        this.password= password;
    }
}