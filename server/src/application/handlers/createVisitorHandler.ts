import VisitorRepository from '../../infrastructure/repositories/visitor.repository';
import CreateVisitorCommand from '../commands/createVisitorCommand';
import Visitor from '../../domain/entities/visitor.entity';

class CreateVisitorHandler {
    private visitorRepository: typeof VisitorRepository;

    public constructor(visitorRepository: typeof VisitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    public async execute(command: CreateVisitorCommand): Promise<void> {
        const visitor = Visitor.create(
            command.getIp(),
            command.getNickname(),
            command.getPin()
        );

        await this.visitorRepository.save(visitor);
    }
}

export default new CreateVisitorHandler(
    VisitorRepository
);
