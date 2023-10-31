export class LikeCommand {
    private readonly id: string;
    private readonly owner: string;
    private readonly pin: string;

    constructor(
        id: string,
        owner: string,
        pin: string
    ) {
        this.id = id;
        this.owner = owner;
        this.pin = pin;
    }

    public getId(): string {
        return this.id;
    }

    public getOwner(): string {
        return this.owner;
    }

    public getPin(): string {
        return this.pin;
    }

}