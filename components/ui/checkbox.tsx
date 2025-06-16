import * as React from 'react';
import { Pressable, StyleSheet, ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { spacing, borderRadius, borderWidth } from '~/lib/tokens';

interface CheckboxProps extends Omit<ViewProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Checkbox({ 
  checked = false, 
  onCheckedChange, 
  disabled = false, 
  style, 
  ...props 
}: CheckboxProps) {
  const scale = useSharedValue(checked ? 1 : 0);
  const backgroundColor = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    scale.value = withSpring(checked ? 1 : 0);
    backgroundColor.value = withSpring(checked ? 1 : 0);
  }, [checked, scale, backgroundColor]);

  const checkStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ['transparent', '#18181b']
      ),
      borderColor: interpolateColor(
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
      onPress={handlePress}
      disabled={disabled}
      style={[styles.pressable, disabled && styles.disabled]}
      {...props}
    >
      <Animated.View style={[styles.container, containerStyle, style]}>
        <Animated.View style={checkStyle}>
          <Check size={12} color="#ffffff" strokeWidth={3} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
  container: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.xs,    // 4px from your tokens
    borderWidth: borderWidth.xs,      // 1px from your tokens
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Checkbox };
export type { CheckboxProps };