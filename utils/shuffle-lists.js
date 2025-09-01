export function shuffleLists(list1, list2) {
    // Combine the lists into an array of pairs
    let combined = list1.map((value, index) => [value, list2[index]]);

    // Shuffle the combined array
    for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]]; // Swap
    }

    // Separate the shuffled pairs back into individual lists
    let shuffledList1 = combined.map(pair => pair[1]);
    let shuffledList2 = combined.map(pair => pair[0]);

    return [shuffledList1, shuffledList2];
}