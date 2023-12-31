export function calculatePrice(type: string, amountOfPeople: number, amountOfHours: number) {
    let price = 0;
    switch (type) {
        case 'Couple':
            price += 100;
            break;
        case 'Family':
            price += 150;
            break;
        case 'Event':
            price += 200;
            break;
        case 'Wedding':
            price += 300;
            break;
        case 'Portrait':
            price += 50;
            break;
    }
    price += amountOfPeople * 5;
    price += amountOfHours * 20;
    return price;
}