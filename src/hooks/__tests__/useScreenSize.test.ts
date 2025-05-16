import { renderHook, act } from '@testing-library/react';
import { useScreenSize } from '../utils/useScreenSize';

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

window.addEventListener = mockAddEventListener;
window.removeEventListener = mockRemoveEventListener;

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
};

describe('useScreenSize', () => {
  it('should return the initial screen size', () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toEqual("xl");
  });

  it('should update the screen size on resize', () => {
    const { result } = renderHook(() => useScreenSize());

    resizeWindow(800, 600);

    expect(result.current).toEqual("xl");
  });

  it('should add and remove resize event listener', () => {
    const { unmount } = renderHook(() => useScreenSize());

    expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});