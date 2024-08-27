// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */

// gid://shopify/ProductVariant/49861226889521
export function run(input) {
  const groupItems = {};

  input.cart.lines.forEach((line) => {
    const bundleId = line.bundleId;
    if (bundleId && bundleId.value) {
      if (!groupItems[bundleId.value]) {
        groupItems[bundleId.value] = [];
      }
      groupItems[bundleId.value].push(line);
    }
  });

  return {
    operations: [
      ...Object.values(groupItems).map((group) => {
        const mergeOperation = {
          merge: {
            cartLines: group.map((line) => {
              return {
                cartLineId: line.id,
                quantity: line.quantity,
              }
            }),
            parentVariantId: "gid://shopify/ProductVariant/49861226889521",
            price: {
              percentageDecrease: {
                value: 50
              }
            }
          }
        };
        return mergeOperation;
      })
    ],
  };

};