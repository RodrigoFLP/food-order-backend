import { Test, TestingModule } from '@nestjs/testing';
import { TicketItemsService } from './ticket-items.service';

describe('TicketItemsService', () => {
  let service: TicketItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketItemsService],
    }).compile();

    service = module.get<TicketItemsService>(TicketItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
