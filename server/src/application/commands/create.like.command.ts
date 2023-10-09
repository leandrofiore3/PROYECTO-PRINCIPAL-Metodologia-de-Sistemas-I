import Visitor from "../../domain/entities/visitor.entity";

export class CreateLikeCommand {
  private readonly id: string;
  private readonly owner: Visitor;
  private readonly pin: string;

    constructor(
        id: string,
        owner: Visitor,
        pin: string
    ) 
    {
        this.id = id;
        this.owner = owner;
        this.pin = pin;
    }

    public getId(): string {
        return this.id;
    }

    public getOwner(): Visitor {
        return this.owner;
    }

    public getPin(): string {
        return this.pin;
    }

}