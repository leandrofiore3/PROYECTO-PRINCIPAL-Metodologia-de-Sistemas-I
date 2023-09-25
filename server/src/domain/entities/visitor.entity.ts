class Visitor {
    id: string;
    ip: string;
    nickname: string;

    private constructor(id: string, ip: string, nickname: string) {
        this.id = id;
        this.ip = ip;
        this.nickname = nickname;
    }
}

export default Visitor;