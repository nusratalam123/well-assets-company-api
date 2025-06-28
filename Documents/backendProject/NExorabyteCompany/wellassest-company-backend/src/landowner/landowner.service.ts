import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

const FILE_PATH = path.join(
  __dirname,
  "../../src/assets/landownerPageData.json"
);

@Injectable()
export class LandownerService {
  private read() {
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  }

  private write(data: any) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  }

  getHeader() {
    return this.read().landownerPage.landownerHeader;
  }

  updateHeader(input: any) {
    const data = this.read();
    data.landownerPage.landownerHeader = input;
    this.write(data);
    return input;
  }

  getEssenceItems() {
    return this.read().landownerPage.essenceItems;
  }

  // create 

  createEssenceItem(input: any) {
    const data = this.read();
    const items = data.landownerPage.essenceItems;
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      ...input,
    };
    items.push(newItem);
    this.write(data);
    return newItem;
  }

  // update 
  updateEssenceItem(id: number, input: any) {
    const data = this.read();
    const items = data.landownerPage.essenceItems;
    const index = items.findIndex((item: any) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    items[index] = { id, ...input };
    this.write(data);
    return items[index];
  }


  // delete 
  deleteEssenceItem(id: number) {
    const data = this.read();
    data.landownerPage.essenceItems = data.landownerPage.essenceItems.filter(
      (i: any) => i.id !== id
    );
    this.write(data);
    return true;
  }
}
