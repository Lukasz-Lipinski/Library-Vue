import AboutVue from '@/views/AboutVue.vue';
import {
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';

describe('Testing About Vue', () => {
  let component: VueWrapper;

  beforeEach(() => {
    component = shallowMount(AboutVue);
  });

  describe('DOM tests', () => {
    it('Should render', () => {
      expect(component).toBeDefined();
    });

    it('Should return 2 divs with class equals "row"', () => {
      const divs = component.findAll('div.row');

      expect(divs.length).toEqual(2);
    });

    it('Should return list of clients that are assigned to state', () => {
      const clients = ['x', 'y', 'z'];
      component = shallowMount(AboutVue, {
        data: () => ({
          clients,
        }),
      });
      const list = component.find(
        'ul[data-testid="clients-list"]'
      );
      expect(list).toBeDefined();

      const li = list.findAll('li');
      expect(li.length).toEqual(clients.length);

      li.forEach((client, index) => {
        expect(client.text()).toBe(
          clients[index]
        );
      });
    });

    it('Should return list of book categories that are directly assigned to state', () => {
      const bookCategories = 'x, y, z, c, bg';

      component = shallowMount(AboutVue, {
        data: () => ({
          bookCategories,
        }),
      });

      const list = component.find(
        'ul[data-testid="material-list"]'
      );
      expect(list).toBeDefined();

      const li = list.findAll('li');
      li.forEach((category, index) => {
        const isIncluded =
          bookCategories.includes(
            category.text()
          );

        expect(isIncluded).toBeTruthy();
      });
    });
  });
});
