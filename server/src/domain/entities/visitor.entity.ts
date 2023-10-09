class Visitor {
    id: string;
    ip: string;
    nickname: string;

    private constructor(id: string, ip: string, nickname: string) {
        this.id = id;
        this.ip = ip;
        this.nickname = nickname;
    }

    getId(): string {
        return this.id;
    }
    static create(id: string, ip: string, nickname: string): Visitor {
        return new Visitor(id, ip, nickname);
    }
}

export default Visitor;