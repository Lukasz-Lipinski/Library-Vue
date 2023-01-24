import BooksListComponent from '@/components/BooksListComponent.vue';
import BookTieComponentVue from '@/components/BookTieComponent.vue';
import { Book } from '@/shared/interfaces';
import {
  mount,
  VueWrapper,
} from '@vue/test-utils';
import {
  createPinia,
  setActivePinia,
} from 'pinia';

describe('Testing BooksListComponent', () => {
  let component: VueWrapper;

  const mockedBooks: Book[] = [
    {
      image: 'test',
      isbn13: 'test',
      price: '33',
      subtitle: 'test',
      title: 'test',
      url: 'tests',
    },
  ];

  beforeEach(() => {
    setActivePinia(createPinia());

    component = mount(BooksListComponent, {
      props: {
        books: mockedBooks,
      },
    });
  });

  describe('Functional tests', () => {
    it('Should get books as props', () => {
      const books = component.props(
        'books'
      ) as Book[];

      expect(books.length).toEqual(
        mockedBooks.length
      );
    });
  });

  describe('DOM tests', () => {
    it('Should render', () => {
      expect(component.exists()).toBeDefined();
    });

    it('Should emerge all passed items', () => {
      const items = component.findAllComponents(
        BookTieComponentVue
      );

      expect(items.length).toEqual(
        mockedBooks.length
      );
    });
  });
});
