import NavigationComponent from '@/components/NavigationComponent.vue';
import { useUserSlicer } from '@/store/useUserSlicer';
import {
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';
import {
  createPinia,
  setActivePinia,
} from 'pinia';

describe('Testing Navigation Component', () => {
  let component: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    component = shallowMount(NavigationComponent);
  });

  it('Should render', () => {
    expect(component).toBeDefined();
  });

  it('Should exactly return 4 links depends on user status', () => {
    const store = useUserSlicer();
    store.login({
      email: '',
      name: '',
      surname: '',
    });

    const divs = component.findAll('div').length;
    expect(divs).toEqual(2);

    let links = component.findAll(
      'router-link'
    ).length;
    expect(links).toEqual(4);

    store.logout();
    links = component.findAll(
      'router-link'
    ).length;
    expect(links).toEqual(4);
  });
});
