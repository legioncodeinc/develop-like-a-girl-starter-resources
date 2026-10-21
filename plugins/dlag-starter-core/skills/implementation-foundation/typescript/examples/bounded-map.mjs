export async function boundedMap(items, concurrency, operation) {
  if (!Array.isArray(items) || items.length > 100 || !Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8 || typeof operation !== 'function') throw new Error('Invalid batch');
  const output = new Array(items.length); let cursor = 0;
  await Promise.all(Array.from({length:Math.min(concurrency, items.length)}, async () => {
    while (cursor < items.length) {const index = cursor++;output[index] = await operation(items[index],index);}
  }));
  return output;
}
