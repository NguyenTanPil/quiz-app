export const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const createSlides = (children: any[], slidesPerPage: number) => {
  const slides = [];

  for (let i = 0; i < children.length; i += slidesPerPage) {
    slides.push(children.slice(i, i + slidesPerPage));
  }

  return slides;
};
