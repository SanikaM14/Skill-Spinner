import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle',
  pure: true
})
export class ShufflePipe implements PipeTransform {

  transform(array: any[], seed?: number): any[] {
    if (!array) return array;
    
    // Create a copy to avoid mutating original
    const shuffled = [...array];
    
    // Use seed for consistent shuffling when seed is provided
    let random = seed ? this.seededRandom(seed) : Math.random;
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  private seededRandom(seed: number): () => number {
    let m = 0x80000000; // 2**31
    let a = 1103515245;
    let c = 12345;
    let state = seed ? seed : Math.floor(Math.random() * (m - 1));
    
    return function() {
      state = (a * state + c) % m;
      return state / (m - 1);
    };
  }

}
