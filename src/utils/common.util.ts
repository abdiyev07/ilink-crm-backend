export const sleep = (sec: number) => {
  return new Promise((res: any) => {
    setTimeout(() => res(), sec * 1000);
  });
};
