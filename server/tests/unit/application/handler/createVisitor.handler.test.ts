import CreateVisitorHandler from "../../../../src/application/handlers/createVisitorHandler";
import CreateVisitorCommand from "../../../../src/application/commands/createVisitorCommand";

describe('CreateVisitorHandler', () => {
    it('should create and save a visitor', async () => {
        // Arrange
        try {
            const createVisitorHandler = CreateVisitorHandler;
            const ip = '127.0.0.1';
            const nickname = 'testUser';
            const pin = '123456';
            const createVisitorCommand = new CreateVisitorCommand(ip, nickname, pin);

            // Act
            const result = await createVisitorHandler.execute(createVisitorCommand);

            // Assert
            expect(result).toBeDefined();
            expect(typeof result.ip).toBe('string');
        } catch (error) {
            fail(`Error en el test ${error}`);
        }
    });
});
