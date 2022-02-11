const shuffleArray = <T>(array: T[]): T[] => {
    let currentIndex: number = (array.length - 1), randomIndex: number; 
    
    while (currentIndex > 0) {
        // generate randomIndex
        randomIndex = Math.floor(Math.random() * currentIndex); 

        // swap currentIndex and randomIndex item 
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

        currentIndex--;
    }
    return array;
}

export default shuffleArray;


shuffleArray([1, 2,3,4])