class Queue {
    constructor(pItems) {
        this.elements = pItems;
    }

    enqueue(node) {
        this.elements?.push(node);
    }

    dequeue() {
        if (this.elements.length > 0) {
            return this.elements?.shift();
        } else {
            return undefined;
        }
    }
    isEmpty() {
        return this.elements?.length == 0;
    }

    front() {
        if (this.elements?.length > 0) {
            return this.elements[0];
        } else {
            return "The Queue is empty!";
        }
    }
    isLastItem() {
        return this.elements?.length == 1;
    }

    getRemainingItems() {
        return this.elements;
    }
}
module.exports = Queue;