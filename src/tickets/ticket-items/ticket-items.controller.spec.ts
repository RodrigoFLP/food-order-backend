import { Test, TestingModule } from '@nestjs/testing';
import { TicketItemsController } from './ticket-items.controller';

describe('TicketItemsController', () => {
  let controller: TicketItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketItemsController],
    }).compile();

    controller = module.get<TicketItemsController>(TicketItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
