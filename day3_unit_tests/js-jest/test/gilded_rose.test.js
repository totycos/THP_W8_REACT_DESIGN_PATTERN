const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {

  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

    // This Conjured item does not work properly yet
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const days = Number(process.argv[2]) || 2;
  const gildedRose = new Shop(items);


  console.log("OMGHAI!");
  for (let day = 0; day < days + 1; day++) {
    console.log(`-------- day ${day} --------`);
    console.log("name, sellIn, quality");
    items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
    gildedRose.updateQuality();
    console.log("")
  }
});



describe('----- day 1 -----', () => {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const gildedRose = new Shop(items);
  const itemsDay1 = gildedRose.updateQuality();

  it("Dexterity Vest should get -1 sellIn and -1 quality and -2 when expiration date is passed till 0", function () {
    expect(itemsDay1[0].sellIn).toBe(9);
    expect(itemsDay1[0].quality).toBe(19);
  });

  it("Aged Brie should get -1 sellIn and +1 quality, 0 when expiration date is passed", function () {
    expect(itemsDay1[1].sellIn).toBe(1);
    expect(itemsDay1[1].quality).toBe(1);
  });

  it("Elixir of the Mongoose should get -1 sellIn and -1 quality and -2 when expiration date is passed till 0", function () {
    expect(itemsDay1[2].sellIn).toBe(4);
    expect(itemsDay1[2].quality).toBe(6);
  });

  it("Sulfuras, Hand of Ragnaros (1) should keep 0 sellIn and keep 80 quality", function () {
    expect(itemsDay1[3].sellIn).toBe(0);
    expect(itemsDay1[3].quality).toBe(80);
  });

  it("Sulfuras, Hand of Ragnaros (2) should keep -1 sellIn and keep 80 quality", function () {
    expect(itemsDay1[4].sellIn).toBe(-1);
    expect(itemsDay1[4].quality).toBe(80);
  });

  it("Backstage passes to a TAFKAL80ETC (1) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay1[5].sellIn).toBe(14);
    expect(itemsDay1[5].quality).toBe(21);
  });

  it("Backstage passes to a TAFKAL80ETC (2) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay1[6].sellIn).toBe(9);
    expect(itemsDay1[6].quality).toBe(50);
  });

  it("Backstage passes to a TAFKAL80ETC (3) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay1[7].sellIn).toBe(4);
    expect(itemsDay1[7].quality).toBe(50);
  });

  it("Conjured Mana Cake) should get -1 sellIn and -2 quality / 0 when exporation date is passed", function () {
    expect(itemsDay1[8].sellIn).toBe(2);
    expect(itemsDay1[8].quality).toBe(4);
  });
})


describe('----- day 3 -----', () => {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const gildedRose = new Shop(items);
  let itemsDay3 = {}
  for (let i = 0; i < 3; i++) {
    itemsDay3 = gildedRose.updateQuality();
  }

  it("Aged Brie expiraion date passed : should get -1 sellIn and +1 quality", function () {
    expect(itemsDay3[1].sellIn).toBe(-1);
    expect(itemsDay3[1].quality).toBe(4);
  });
})


describe('----- day 6 -----', () => {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const gildedRose = new Shop(items);
  let itemsDay6 = {}
  for (let i = 0; i < 6; i++) {
    itemsDay6 = gildedRose.updateQuality();
  }

  it("Elixir of the Mongoose should get -1 sellIn and -1 quality / -2 when expiration date is passed till 0", function () {
    expect(itemsDay6[2].sellIn).toBe(-1);
    expect(itemsDay6[2].quality).toBe(0);
  });

  it("Backstage passes to a TAFKAL80ETC (1) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay6[5].sellIn).toBe(9);
    expect(itemsDay6[5].quality).toBe(27);
  });

  it("Backstage passes to a TAFKAL80ETC (3) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay6[7].sellIn).toBe(-1);
    expect(itemsDay6[7].quality).toBe(0);
  });

  it("Conjured Mana Cake) should get -1 sellIn and -2 quality / 0 when exporation date is passed", function () {
    expect(itemsDay6[8].sellIn).toBe(-3);
    expect(itemsDay6[8].quality).toBe(0);
  });
})


describe('----- day 11 -----', () => {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const gildedRose = new Shop(items);
  let itemsDay11 = {}
  for (let i = 0; i < 11; i++) {
    itemsDay11 = gildedRose.updateQuality();
  }

  it("Dexterity Vest should get -1 sellIn and -1 quality / -2 when expiration date is passed till 0", function () {
    expect(itemsDay11[0].sellIn).toBe(-1);
    expect(itemsDay11[0].quality).toBe(8);
  });

  it("Backstage passes to a TAFKAL80ETC (2) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay11[6].sellIn).toBe(-1);
    expect(itemsDay11[6].quality).toBe(0);
  });
})


describe('----- day 15 -----', () => {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const gildedRose = new Shop(items);
  let itemsDay15 = {}
  for (let i = 0; i < 15; i++) {
    itemsDay15 = gildedRose.updateQuality();
  }


  it("Dexterity Vest should get -1 sellIn and -1 quality / -2 when expiration date is passed till 0", function () {
    expect(itemsDay15[0].sellIn).toBe(-5);
    expect(itemsDay15[0].quality).toBe(0);
  });

  it("Aged Brie should get -1 sellIn and +1 quality / 0 when expiration date is passed", function () {
    expect(itemsDay15[1].sellIn).toBe(-13);
    expect(itemsDay15[1].quality).toBe(28);
  });

  it("Elixir of the Mongoose should get -1 sellIn and -1 quality/ -2 when expiration date is passed till 0", function () {
    expect(itemsDay15[2].sellIn).toBe(-10);
    expect(itemsDay15[2].quality).toBe(0);
  });

  it("Sulfuras, Hand of Ragnaros (1) should keep 0 sellIn and keep 80 quality", function () {
    expect(itemsDay15[3].sellIn).toBe(0);
    expect(itemsDay15[3].quality).toBe(80);
  });

  it("Sulfuras, Hand of Ragnaros (2) should keep -1 sellIn and keep 80 quality", function () {
    expect(itemsDay15[4].sellIn).toBe(-1);
    expect(itemsDay15[4].quality).toBe(80);
  });

  it("Backstage passes to a TAFKAL80ETC (1) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay15[5].sellIn).toBe(0);
    expect(itemsDay15[5].quality).toBe(50);
  });

  it("Backstage passes to a TAFKAL80ETC (2) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay15[6].sellIn).toBe(-5);
    expect(itemsDay15[6].quality).toBe(0);
  });

  it("Backstage passes to a TAFKAL80ETC (3) should get -1 sellIn and +1 quality (max is 50), +2 when 10 days left, +3 when 5 days left then 0 when expiration date is passed", function () {
    expect(itemsDay15[7].sellIn).toBe(-10);
    expect(itemsDay15[7].quality).toBe(0);
  });
})