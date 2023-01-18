import SigninForm from '@/components/SigninForm.vue';
import {
  mount,
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';
import axios from 'axios';
import {
  createPinia,
  setActivePinia,
} from 'pinia';

describe('Testing Signin Form Component', () => {
  let component: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    component = shallowMount(SigninForm);
  });

  describe('Functional tests', () => {
    it('Should check validation of all inputs while onChange is invoking', () => {
      const submitting = jest.spyOn(
        axios,
        'post'
      );

      const form = component.find('form');

      form.trigger('submit');

      expect(submitting).toBeCalledTimes(1);
    });

    it('Should set spinner after invoking submision', async () => {
      let spinner = component.find(
        'div.spinner-border'
      );

      expect(spinner.exists()).toBeFalsy();

      const from = component.find('form');
      await from.trigger('submit');

      spinner = component.find(
        'div.spinner-border'
      );

      expect(spinner.exists()).toBeTruthy();
    });
  });

  describe('DOM tests', () => {
    it('Should render', () => {
      expect(component).toBeDefined();
    });

    it('Should return form with 3 formkit elements', () => {
      const allFormKits =
        component.findAll('FormKit');

      expect(allFormKits.length).toEqual(3);
    });
  });
});
