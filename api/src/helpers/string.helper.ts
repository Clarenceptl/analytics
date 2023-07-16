export const generateRandomString = (round: number): string => {
  if (round < 1) throw new Error('Round must be greater than 0');
  let text = '';
  for (let index = 0; index < round; index++) {
    text += Math.floor(Math.random() * Date.now()).toString(36);
  }
  return text;
};
