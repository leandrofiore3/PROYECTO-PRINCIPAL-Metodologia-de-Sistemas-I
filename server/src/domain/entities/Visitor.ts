export class Visitor {
    id: string;
    ip: string;
    nickname: string;

    constructor(id: string, ip: string, nickname: string) {
        this.id = id;
        this.ip = ip;
        this.nickname = nickname;
    }
}