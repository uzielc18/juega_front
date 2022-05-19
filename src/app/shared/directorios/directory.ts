let upeu:any = 'upeu';
export const DIRECTORY = {
  base: upeu,
  courses: upeu + '/courses',
  exam: upeu + '/exam',
  news: upeu + '/news',
  users: upeu + '/users',
  // works: dir + '/works',
  // forums: dir + '/forum',
  // question: 'exam'
};

let dir_element: any = DIRECTORY.courses;
export const DIRECTORY_ELEMENTS = {
  base: dir_element,
  works: dir_element + '/works',
  forums: dir_element + '/forum',
  // exam: dir_element + '/exam',
};
