export class Datsan{
    id?:number;
    idsan: number;
    iduser: number;
    start_time : string;
    price: number;
    constructor(idsan: number, iduser: number, start_time: string,price: number) {
        this.idsan=idsan;
        this.iduser=iduser;
        this.start_time=start_time;
        this.price=price;
    }
};
