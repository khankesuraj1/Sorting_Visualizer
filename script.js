let array = [];
const arraySize = 50;
const arrayContainer = document.getElementById('array');

function generateArray() {
  array = [];
  arrayContainer.innerHTML = '';
  for (let i = 0; i < arraySize; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`;
    arrayContainer.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';
      await sleep(50);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }
      bars[j].style.backgroundColor = 'turquoise';
      bars[j + 1].style.backgroundColor = 'turquoise';
    }
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;
      j--;
      await sleep(50);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${array[j + 1]}px`;
    await sleep(50);
  }
}

async function quickSort(start = 0, end = array.length - 1) {
  if (start < end) {
    let index = await partition(start, end);
    await quickSort(start, index - 1);
    await quickSort(index + 1, end);
  }
}

async function partition(start, end) {
  const bars = document.getElementsByClassName('bar');
  let pivot = array[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    bars[j].style.backgroundColor = 'yellow';
    await sleep(50);
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
    }
    bars[j].style.backgroundColor = 'turquoise';
  }
  [array[i + 1], array[end]] = [array[end], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[end].style.height = `${array[end]}px`;
  return i + 1;
}

async function selectionSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = 'red';
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';
      await sleep(50);
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = 'turquoise';
        minIndex = j;
        bars[minIndex].style.backgroundColor = 'red';
      } else {
        bars[j].style.backgroundColor = 'turquoise';
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
    }
    bars[i].style.backgroundColor = 'turquoise';
  }
}

async function mergeSortStart() {
  await mergeSort(0, array.length - 1);
}

async function mergeSort(start, end) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const bars = document.getElementsByClassName('bar');
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    bars[k].style.backgroundColor = 'purple';
    await sleep(50);
    if (left[i] <= right[j]) {
      array[k] = left[i++];
    } else {
      array[k] = right[j++];
    }
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = 'turquoise';
    k++;
  }

  while (i < left.length) {
    bars[k].style.backgroundColor = 'purple';
    await sleep(50);
    array[k] = left[i++];
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = 'turquoise';
    k++;
  }

  while (j < right.length) {
    bars[k].style.backgroundColor = 'purple';
    await sleep(50);
    array[k] = right[j++];
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = 'turquoise';
    k++;
  }
}

generateArray();
