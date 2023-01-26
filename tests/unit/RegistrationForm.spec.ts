import RegistrationForm from '@/components/RegistrationForm.vue';
import {
  createPinia,
  setActivePinia,
} from 'pinia';
import {
  shallowMount,
  VueWrapper,
  flushPromises,
} from '@vue/test-utils';
import { UserProps } from '@/store/useUserSlicer';

const mockedData: UserProps = {
  email: 'test@test.com',
  name: 'test-name',
  surname: 'test-surname',
  localId: 'test',
};

describe('Testing Registration Form Component', () => {
  let component: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    component = shallowMount(RegistrationForm);
  });

  it('Should render', () => {
    expect(component).toBeDefined();
  });

  it('Should return 2 inputs and 1 button', () => {
    const formkits =
      component.findAll('FormKit').length;
    const btn = component.find('button');

    expect(formkits).toEqual(5);
    expect(btn).toBeDefined();
  });
});
