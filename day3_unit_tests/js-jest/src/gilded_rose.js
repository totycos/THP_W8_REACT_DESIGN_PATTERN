class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      this.updateNormalItem(currentItem);
      this.updateSpecialItem(currentItem);

      if (currentItem.name !== 'Sulfuras, Hand of Ragnaros') {
        currentItem.sellIn -= 1;
      }

      this.updateConjuredItem(currentItem)
      this.updateExpiredItem(currentItem);
    }

    return this.items;
  }

  updateNormalItem(item) {
    if (item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0 && item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.quality -= 1;
      }
    }
  }

  updateSpecialItem(item) {
    if (item.name === 'Aged Brie' || item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality < 50) {
        item.quality += 1;

        if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
          this.updateBackstagePasses(item);
        }
      }
    }
  }

  updateBackstagePasses(item) {
    if (item.sellIn < 11 && item.quality < 50) {
      item.quality += 1;
    }

    if (item.sellIn < 6 && item.quality < 50) {
      item.quality += 1;
    }
  }

  updateConjuredItem(item) {
    if (item.quality > 0 && item.name.startsWith('Conjured')) {
      item.quality -= 1;
    }
  }

  updateExpiredItem(item) {
    if (item.sellIn < 0) {
      if (item.name !== 'Aged Brie') {
        if (item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0 && item.name !== 'Sulfuras, Hand of Ragnaros') {
            item.quality -= 1;
          }
        } else {
          item.quality = 0;
        }
      } else if (item.quality < 50) {
        item.quality += 1;
      }
    }
  }
}

module.exports = {
  Item,
  Shop
};
