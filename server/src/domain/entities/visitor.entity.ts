import { generateUuid } from "../../utils/generateUuid";

class Visitor {
    id: string;
    ip: string;
    nickname: string;
    pin: string;

    private constructor(id: string, ip: string, nickname: string, pin: string) {
        this.id = id;
        this.ip = ip;
        this.nickname = nickname;
        this.pin = pin;
    }

    public getId(): string {
        return this.id;
    }

    public static create(ip: string, nickname: string, pin: string): Visitor {
        return new Visitor(generateUuid(), ip, nickname, pin);

    }
    getPin(): string {
        return this.pin;
    }
}
export default Visitor;