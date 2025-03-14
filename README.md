# Ultra Mega Enumerator

Ultra Mega Enumerator is a lightweight library designed to enumerate various combinatorial objects. Its goal is to provide efficient tools for generating combinations, permutations, compositions, partitions, and more.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Enumerations](#enumerations)
- [Objects](#objects)

## Overview

Combinatorial enumeration is a fundamental aspect of discrete mathematics and computer science. The Ultra Mega Enumerator library offers a collection of classes for generating and handling different types of combinatorial structures, making it a valuable resource for researchers, students, and developers working with these concepts.

## Installation
You can install the Ultra Mega Enumerator library via npm. To do so, run the following command in your terminal:

```bash
npm install ultra-mega-enumerator
```

Alternatively, if you are using Yarn as your package manager, you can install it with:
```bash
yarn add ultra-mega-enumerator
```

## Usage

Once installed, you can import and use Ultra Mega Enumerator in your JavaScript or TypeScript project as follows:


```ts
import { CombinationEnumeration } from 'ultra-mega-enumerator';

// Example usage
for(let e of new CombinationEnumeration(7,4)){ 
    //... 
}
```
The Numbers class contains static counting functions such as factorial, binomial, bell and catalan.

### Enumerations
The library includes the following enumeration classes located in the enumerations/ directory:

- AbstractEnumeration: Base class for all enumerations implementing Iterable.
- BitSetEnumeration: Enumerate bit sets.
- CombinationEnumeration: Enumerate combinations.
- CompositionEnumeration: Enumerate compositions.
- DyckWordEnumeration: Enumerate Dyck words.
- FixedSetPartitionEnumeration: Enumerate fixed-size set partitions.
- KCompositionEnumeration: Enumerate k-compositions.
- KPermutationEnumeration: Enumerate k-permutations.
- MixedRadixEnumeration: Enumerate mixed radix systems or cartesian product of integers.
- NGoodPathEnumeration: Enumerate N-good paths.
- NonCrossingPartitionEnumeration: Enumerate non-crossing partitions.
- PartitionEnumeration: Enumerate integer partitions.
- PermutationEnumeration: Enumerate permutations.
- SetPartitionEnumeration: Enumerate set partitions.
- WeakCompositionEnumeration: Enumerate weak compositions.
- WeakOrderEnumeration: Enumerate weak orders.
- WordEnumeration: Enumerate words over an alphabet.
- WordPermutationEnumeration: Enumerate permutations of words.

### Objects
The library also provides the following combinatorial objects in the objects/ directory:
- BitSet: A representation of a set using bits.
- Combination: A representation of a mathematical combination.
- Composition: A representation of a mathematical composition.
- more...
