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

    getPin(): string {
        return this.pin;
    }
}

export default Visitor;