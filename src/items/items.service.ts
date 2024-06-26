// src/items/items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find(item => item.id === id);
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  create(createItemDto: CreateItemDto): Item {
    const newItem = { id: this.idCounter++, ...createItemDto };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, updateItemDto: UpdateItemDto): Item {
    const item = this.findOne(id);
    Object.assign(item, updateItemDto);
    return item;
  }

  delete(id: number): void {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) throw new NotFoundException('Item not found');
    this.items.splice(itemIndex, 1);
  }
}
