import NewsLetterComponent from '@/components/NewsletterComponent.vue';
import {
  VueWrapper,
  mount,
  flushPromises,
} from '@vue/test-utils';

describe('Testing Newsletter Component', () => {
  let component: VueWrapper;

  beforeEach(() => {
    component = mount(NewsLetterComponent);
  });

  describe('Functional tests', () => {
    it('Should disable button if data are not correct', () => {
      let btn = component.find(
        'FormKit[type="submit"]'
      );
      expect(
        btn.attributes('disabled')
      ).toBeTruthy();

      btn.trigger('click');
      flushPromises();
      btn = component.find(
        'FormKit[type="submit"]'
      );
      expect(
        btn.attributes('disabled')
      ).toBeTruthy();
    });

    it('Should unlock button if data are correct', () => {
      const inputEmail =
        component.find('FormKit');
      console.log('formkit', inputEmail);
    });
  });

  describe('DOM tests', () => {
    it('Should render', () => {
      expect(component.exists()).toBeTruthy();
    });

    it("Should return 3 formkit's elements", () => {
      const formkits =
        component.findAll('FormKit');

      expect(formkits.length).toEqual(3);
    });
  });
});
