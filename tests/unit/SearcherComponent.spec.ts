import SearcherComponentVue from '@/components/SearcherComponent.vue';
import {
  flushPromises,
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';

describe('Testing Searcher Component', () => {
  let component: VueWrapper;

  beforeEach(() => {
    component = shallowMount(
      SearcherComponentVue
    );
  });

  describe('Functional tests', () => {
    it('Should disable button if input is empty', () => {
      const btn = component.find(
        'button[data-test-id="searcher-btn"]'
      );

      expect(btn.exists()).toBeDefined();

      expect(
        (btn.element as HTMLButtonElement)
          .disabled
      ).toBeTruthy();
    });

    it('Should not disable button if input is filled in', async () => {
      const input = component.find(
        'input.form-control'
      );

      expect(
        (input.element as HTMLInputElement).value
      ).toEqual('');

      input.setValue('test');
      await flushPromises();

      expect(
        (input.element as HTMLInputElement).value
      ).toEqual('test');

      const btn = component.find(
        'button[data-test-id="searcher-btn"]'
      ).element as HTMLButtonElement;
      expect(btn.disabled).toBeFalsy();
    });
  });

  describe('DOM tests', () => {
    it('Should render', () => {
      expect(component.exists()).toBeTruthy();
    });

    it('Should display input and button', () => {
      const btn = component.find(
        'button[data-test-id="searcher-btn"]'
      );
      const input = component.find('input');

      expect(btn.exists()).toBeTruthy();
      expect(input.exists()).toBeTruthy();
    });
  });
});
