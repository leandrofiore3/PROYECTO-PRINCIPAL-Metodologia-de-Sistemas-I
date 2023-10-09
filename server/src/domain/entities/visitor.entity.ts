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

    getId(): string {
        return this.id;
    }
    static create(id: string, ip: string, nickname: string, pin: string): Visitor {
        return new Visitor(id, ip, nickname, pin);

    }
    getPin(): string {
        return this.pin;
    }
}
export default Visitor;