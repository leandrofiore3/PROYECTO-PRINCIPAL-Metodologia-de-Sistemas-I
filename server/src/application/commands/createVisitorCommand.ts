import { generate } from "shortid";

class CreateVisitorCommand {
    private readonly id: string;
    private readonly ip: string;
    private readonly nickname: string;

    public constructor(
        ip: string,
        nickname: string
    ) {
        this.id = generate();
        this.ip = ip;
        this.nickname = nickname;
    }
    public getId(): string {
        return this.id;
    }
    public getIp(): string {
        return this.ip;
    }
    public getNickname(): string {
        return this.nickname;
    }
}

export default CreateVisitorCommand;
