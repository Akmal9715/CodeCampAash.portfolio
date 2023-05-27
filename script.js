class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }

  setEnd() {
    this.end = true;
  }

  isEnd() {
    return this.end;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(wordParam) {
    const addWord = (word, root) => {
      if (word) {
        const letter = word[0];
        if (root.keys.has(letter)) {
          addWord(word.substring(1), root.keys.get(letter));
        } else {
          const node = new Node();
          root.keys.set(letter, node);
          if (word.length === 1) {
            node.setEnd();
          }
          addWord(word.substring(1), node);
        }
      }
    };

    addWord(wordParam, this.root);
  }

  isWord(word) {
    let root = this.root;
    while (word) {
      const firstLetter = word[0];
      if (root.keys.has(firstLetter)) {
        if (word.length === 1) {
          if (!root.keys.get(firstLetter).isEnd()) {
            return false;
          }
        }
        word = word.substring(1);
      } else {
        return false;
      }
      root = root.keys.get(firstLetter);
    }
    return true;
  }

  print() {
    const words = [];

    const retrieve = (root, word) => {
      if (root.keys.size !== 0) {
        for (const [letter, childNode] of root.keys) {
          retrieve(childNode, word + letter);
        }
        if (root.isEnd()) {
          words.push(word);
        }
      } else {
        if (word.length > 0) {
          words.push(word);
        }
        return;
      }
    };

    retrieve(this.root, '');
    console.log(words);
    return words;
  }
}

// Usage example:
const trie = new Trie();
trie.add('apple');
trie.add('application');
trie.add('apply');
console.log(trie.isWord('apple')); // true
console.log(trie.isWord('app')); // false
console.log(trie.print()); // ['apple', 'application', 'apply']
