import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

interface CustomOption {
  render: (close: () => void) => React.ReactNode;
}

interface Option {
  type: 'custom';
  option: CustomOption | null;
  onClose: () => void;
}

export interface DrawerHandler {
  showCustom: (option: CustomOption) => void;
}

const Drawer = forwardRef<DrawerHandler, any>((props, ref) => {
  const [state, setState] = useState<Option | undefined>();
  const option = state && state.option;
  const type = state && state.type;

  const onClose = useCallback(() => {
    setState(undefined);
  }, [setState]);

  useImperativeHandle(ref, () => ({
    showCustom(customOption) {
      setState({
        type: 'custom',
        option: customOption,
        onClose,
      });
    },
  }));

  const result = useMemo(() => {
    if (type === 'custom') {
      const { render } = option as CustomOption;
      return render(onClose);
    }
    return null;
  }, [type, option, onClose]);
  if (state) {
    switch (state.type) {
      case 'custom':
        return <>{result}</>;
    }
  }
  return null;
});

Drawer.displayName = 'Drawer';

export default Drawer;
