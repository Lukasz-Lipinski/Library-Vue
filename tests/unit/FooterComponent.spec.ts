import FooterComponentVue from '@/components/FooterComponent.vue';
import ToastComponentVue from '@/components/ToastComponent.vue';
import {
  flushPromises,
  mount,
  VueWrapper,
} from '@vue/test-utils';

describe('Testing Footer Component', () => {
  let component: VueWrapper;

  beforeEach(() => {
    component = mount(FooterComponentVue);
  });

  describe('Functional tests', () => {
    it('Should emerge Toast Component if passed props is true', async () => {
      let toast = component.findComponent(
        ToastComponentVue
      );

      expect(toast.exists()).toBeFalsy();

      component.setData({
        isToast: true,
      });

      await flushPromises();

      toast = component.findComponent(
        ToastComponentVue
      );
      expect(toast.exists()).toBeTruthy();
    });

    it('Should hide Toast Component if close btn was pressed', async () => {
      component.setData({
        isToast: true,
      });

      await flushPromises();

      const btn = component
        .findComponent(ToastComponentVue)
        .find('button');

      btn.trigger('click');

      await flushPromises();

      const toast = component.findComponent(
        ToastComponentVue
      );
      expect(toast.exists()).toBeFalsy();
    });
  });

  describe('DOM tests', () => {
    it('Should render', () => {
      expect(component.exists()).toBeTruthy();
    });

    it('Should not defaulty emerge toast component', () => {
      const toast = component.findComponent(
        ToastComponentVue
      );

      expect(toast.exists()).toBeTruthy();
    });
  });
});
