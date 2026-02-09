export const scalesRange = ({ indexColor, min, max }: { indexColor: string[], min: number, max: number }) => {
  console.log(indexColor.map((_, i) => {
    const value = min + ((max - min) / indexColor.length) * i;
    return [value, indexColor[i]];
  }))
  return indexColor.map((_, i) => {
    const value = min + ((max - min) / indexColor.length) * i;
    return [value, indexColor[i]];
  });
}