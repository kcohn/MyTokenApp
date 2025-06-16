import * as React from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { spacing, borderRadius, borderWidth, units } from '~/lib/tokens';

const router = useRouter();

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardHeader style={styles.cardHeader}>
          <Avatar style={styles.avatar} alt={''}>
            <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
            <AvatarFallback>
              <Text>RS</Text>
            </AvatarFallback>
          </Avatar>
          <View style={styles.spacer} />
          <CardTitle style={styles.cardTitle}>Rick Sanchez</CardTitle>
          <View style={styles.titleRow}>
            <CardDescription style={styles.profession}>Scientist</CardDescription>
            <Tooltip delayDuration={150}>
              <TooltipTrigger style={styles.tooltipTrigger}>
                <Info size={14} strokeWidth={2.5} style={styles.infoIcon} />
              </TooltipTrigger>
              <TooltipContent style={styles.tooltipContent}>
                <Text style={styles.tooltipText}>Freelance</Text>
              </TooltipContent>
            </Tooltip>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Dimension</Text>
              <Text style={styles.statValue}>C-137</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>70</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Species</Text>
              <Text style={styles.statValue}>Human</Text>
            </View>
          </View>
        </CardContent>
        <CardFooter style={styles.cardFooter}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Productivity:</Text>
            <LayoutAnimationConfig skipEntering>
              <Animated.View
                key={progress}
                entering={FadeInUp}
                exiting={FadeOutDown}
                style={styles.progressValue}
              >
                <Text style={styles.progressText}>{progress}%</Text>
              </Animated.View>
            </LayoutAnimationConfig>
          </View>
          <Progress value={progress} style={styles.progress} />
          <View style={styles.spacer} />
          <Button
            variant='outline'
            style={styles.updateButton}
            onPress={updateProgressValue}
          >
            <Text>Update</Text>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Design System Button */}
      <Button 
        variant="outline" 
        className="mt-4"
        onPress={() => router.push('/shadecn-demo')}
      >
        <Text>🎨 View shadcn/ui Components</Text>
      </Button>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.l,                  // 16px from your tokens
    padding: spacing.xl,             // 24px from your tokens
    backgroundColor: '#f8fafc',
  },
  card: {
    width: '100%',
    maxWidth: 384,
    padding: spacing.xl,             // 24px from your tokens
    borderRadius: borderRadius.l,    // 16px from your tokens
  },
  cardHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: units[96],                // 96px from your tokens
    height: units[96],               // 96px from your tokens
  },
  spacer: {
    height: spacing.m,               // 12px from your tokens
  },
  cardTitle: {
    paddingBottom: spacing.s,        // 8px from your tokens
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profession: {
    fontSize: 16,
    fontWeight: '600',
  },
  tooltipTrigger: {
    paddingHorizontal: spacing.s,    // 8px from your tokens
    paddingBottom: spacing.xs,       // 4px from your tokens (converted to 2)
  },
  infoIcon: {
    width: units[16],                // 16px from your tokens
    height: units[16],               // 16px from your tokens
    color: '#71717a',
  },
  tooltipContent: {
    paddingVertical: spacing.s,      // 8px from your tokens
    paddingHorizontal: spacing.l,    // 16px from your tokens
  },
  tooltipText: {
    fontSize: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing.m,                  // 12px from your tokens
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#71717a',
    marginBottom: spacing.xs,        // 4px from your tokens
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'column',
    gap: spacing.m,                  // 12px from your tokens
    paddingBottom: 0,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  progressLabel: {
    fontSize: 14,
    color: '#71717a',
    marginRight: spacing.s,          // 8px from your tokens
  },
  progressValue: {
    width: units[48],                // 48px from your tokens (wider for readability)
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  progress: {
    height: spacing.s,               // 8px from your tokens
  },
  updateButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tokenTest: {
    marginTop: spacing.xl,           // 24px from your tokens
    padding: spacing.l,              // 16px from your tokens
    backgroundColor: '#f1f5f9',
    borderRadius: borderRadius.s,    // 8px from your tokens
    borderWidth: borderWidth.xs,     // 1px from your tokens
    borderColor: '#e2e8f0',
    alignItems: 'center',
    maxWidth: '90%',
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: spacing.s,         // 8px from your tokens
  },
  tokenDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});