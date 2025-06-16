import * as React from 'react';
import { Pressable, StyleSheet, ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { spacing, borderRadius } from '~/lib/tokens';

interface SwitchProps extends Omit<ViewProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({ 
  checked = false, 
  onCheckedChange, 
  disabled = false, 
  style, 
  ...props 
}: SwitchProps) {
  const translateX = useSharedValue(checked ? 20 : 0);
  const backgroundColor = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    translateX.value = withSpring(checked ? 20 : 0);
    backgroundColor.value = withSpring(checked ? 1 : 0);
  }, [checked, translateX, backgroundColor]);

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const trackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ['#e4e4e7', '#18181b']
      ),
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange?.(!checked);
    }
  };

  return (
    <Pressable
      style={[styles.container, disabled && styles.disabled, style]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
  },
  track: {
    flex: 1,
    borderRadius: borderRadius.m,     // 12px from your tokens
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,                 // Half of thumb size for circle
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Switch };
export type { SwitchProps };