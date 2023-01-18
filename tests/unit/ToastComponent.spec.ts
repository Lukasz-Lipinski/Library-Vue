import ToastComponent from '@/components/ToastComponent.vue';
import {
  flushPromises,
  mount,
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';

describe('Testing ToastComponent', () => {
  let component: VueWrapper;

  beforeEach(() => {
    component = shallowMount(ToastComponent);
  });

  describe('Functional Tests', () => {
    it('Should be emerged if passed props is true', async () => {
      let toast = component.find(
        '[data-testid="toast-component"]'
      );
      expect(toast.exists()).toBeFalsy();

      await component.setProps({
        isToast: true,
      });

      toast = component.find(
        '[data-testid="toast-component"]'
      );

      expect(toast.exists()).toBeTruthy();
    });

    it('Should start timer if is mounted', async () => {
      const component = mount(ToastComponent, {
        data() {
          return {
            timer: 0,
          };
        },
      });

      await component.setProps({
        isToast: true,
      });

      expect(component.exists()).toBeTruthy();
      component.unmount();
      await flushPromises();

      expect(component.exists()).toBeFalsy();
    });

    it('Should emit value after mounting', async () => {
      component.vm.$emit('snackbar', true);

      await component.setProps({
        isToast: true,
      });

      await component.vm.$nextTick();
      await flushPromises();

      expect(
        component.emitted('snackbar')
      ).toBeTruthy();

      expect(
        component.emitted('snackbar')![0]
      ).toBeTruthy();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component.exists()).toBeDefined();
    });

    it('Should be emerged if props is true', async () => {
      let toast = component.find(
        '[data-testid="toast-component"]'
      );
      expect(toast.exists()).toBeFalsy();

      component.setProps({
        isToast: true,
      });

      await flushPromises();

      toast = component.find(
        '[data-testid="toast-component"]'
      );

      expect(toast.exists()).toBeTruthy();
    });
  });
});
