// app/index.tsx - Enhanced with Student Loan Card
import * as React from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
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
import { StudentLoanCard } from '~/components/ui/student-loan-card';
import { 
  spacing, 
  borderRadius, 
  borderWidth, 
  units,
  typography,
  fontFamily,
  fontWeight,
  shadows,
  colors,
  breakpoints
} from '~/lib/tokens';

const router = useRouter();

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  // Student Loan handlers
  const handleMakePayment = () => {
    Alert.alert(
      'Make Payment', 
      'This would redirect to the payment portal in a real app.',
      [{ text: 'OK' }]
    );
  };

  const handleManageAutoDebit = () => {
    Alert.alert(
      'Auto Debit Settings', 
      'This would open auto debit management settings.',
      [{ text: 'OK' }]
    );
  };

  const handleViewLoanDetails = () => {
    Alert.alert(
      'Loan Details', 
      'This would show detailed loan information and payment history.',
      [{ text: 'OK' }]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Section Title */}
      <Text style={styles.sectionTitle}>
        My Dashboard
      </Text>

      {/* Student Loan Cards */}
      <View style={styles.loanSection}>
        <Text style={styles.subsectionTitle}>
          Student Loans
        </Text>
        
        <StudentLoanCard
          title="SU: Fall 2024 - Spring 2025"
          amount="$349.51"
          dueDate="Apr 27, 2025"
          totalAmount="$17,419.03"
          asOfDate="Mar 25, 2025"
          currentAmountDue="$349.51"
          paymentPending="$499.00"
          dueDateDetail="April 27th, 2025"
          isAutoDebitEnrolled={false}
          onMakePayment={handleMakePayment}
          onManageAutoDebit={handleManageAutoDebit}
          onViewDetails={handleViewLoanDetails}
        />

        <StudentLoanCard
          title="SU: Fall 2023 - Spring 2024"
          amount="$425.00"
          dueDate="May 15, 2025"
          isAutoDebitEnrolled={true}
          onMakePayment={handleMakePayment}
          onManageAutoDebit={handleManageAutoDebit}
          onViewDetails={handleViewLoanDetails}
        />
      </View>

      {/* Profile Card Section */}
      <View style={styles.profileSection}>
        <Text style={styles.subsectionTitle}>
          Profile Overview
        </Text>
        
        <Card style={styles.profileCard}>
          <CardHeader style={styles.cardHeader}>
            <Avatar style={styles.avatar} alt={''}>
              <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
              <AvatarFallback>
                <Text style={styles.avatarText}>RS</Text>
              </AvatarFallback>
            </Avatar>
            
            <View style={styles.spacer} />
            
            <Text style={styles.profileName}>Rick Sanchez</Text>
            
            <View style={styles.titleRow}>
              <Text style={styles.profession}>Scientist</Text>
              <Tooltip delayDuration={150}>
                <TooltipTrigger style={styles.tooltipTrigger}>
                  <Info size={units[16]} strokeWidth={2.5} style={styles.infoIcon} />
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
            
            <View style={styles.spacerLarge} />
            
            <Button
              variant='outline'
              size='default'
              style={styles.updateButton}
              onPress={updateProgressValue}
            >
              <Text>Update Progress</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationSection}>
        <Button 
          variant="outline" 
          size="lg"
          style={styles.designSystemButton}
          onPress={() => router.push('/shadecn-demo')}
        >
          <Text>🎨 View Design System</Text>
        </Button>
        
        {/* Token Usage Example */}
        <View style={styles.tokenShowcase}>
          <Text style={styles.showcaseTitle}>Design Tokens in Action</Text>
          <Text style={styles.showcaseDescription}>
            This interface uses {spacing.xl}px spacing, {borderRadius.s}px border radius, 
            and the {fontFamily.rocGrotesk} font family from your design tokens.
          </Text>
        </View>
      </View>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  contentContainer: {
    paddingTop: spacing.l,               // 16px from your tokens
    paddingBottom: spacing['2xl'],       // 32px from your tokens for bottom spacing
  },
  
  sectionTitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,            // 24px from your tokens
    color: colors.text.primary,
    paddingHorizontal: spacing.l,        // 16px from your tokens
  },

  loanSection: {
    marginBottom: spacing['2xl'],        // 32px from your tokens
  },

  profileSection: {
    paddingHorizontal: spacing.l,        // 16px from your tokens
    marginBottom: spacing.xl,            // 24px from your tokens
  },

  navigationSection: {
    paddingHorizontal: spacing.l,        // 16px from your tokens
    gap: spacing.l,                      // 16px from your tokens
  },

  subsectionTitle: {
    marginBottom: spacing.l,             // 16px from your tokens
    paddingHorizontal: spacing.l,        // 16px from your tokens
    color: colors.text.primary,
  },
  
  profileCard: {
    padding: spacing.xl,                 // 24px from your tokens
    ...shadows.md,                       // Medium shadow from your tokens
  },
  
  cardHeader: {
    alignItems: 'center',
    gap: spacing.s,                      // 8px gap using your tokens
  },
  
  avatar: {
    width: units[80],                    // 80px from your tokens (smaller than before)
    height: units[80],                   // 80px from your tokens
  },
  
  spacer: {
    height: spacing.s,                   // 8px from your tokens
  },
  
  spacerLarge: {
    height: spacing.m,                   // 12px from your tokens
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,                     // 4px gap using your tokens
  },
  
  tooltipTrigger: {
    padding: spacing.xs,                 // 4px from your tokens
  },
  
  infoIcon: {
    color: colors.text.tertiary,         // Using your tertiary text color
  },
  
  tooltipContent: {
    paddingVertical: spacing.s,          // 8px from your tokens
    paddingHorizontal: spacing.m,        // 12px from your tokens
  },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing.l,                      // 16px from your tokens
    paddingVertical: spacing.m,          // 12px from your tokens
  },
  
  statItem: {
    alignItems: 'center',
    gap: spacing.xs,                     // 4px from your tokens
  },
  
  statLabel: {
    textAlign: 'center',
  },
  
  cardFooter: {
    flexDirection: 'column',
    gap: spacing.s,                      // 8px from your tokens
    paddingBottom: 0,
  },
  
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,                      // 8px from your tokens
    overflow: 'hidden',
  },
  
  progressLabel: {
    flex: 1,
  },
  
  progressValue: {
    minWidth: units[40],                 // 40px from your tokens
    alignItems: 'center',
  },
  
  progressText: {
    color: colors.semantic.info,         // Using your info color
  },
  
  progress: {
    height: spacing.s,                   // 8px from your tokens
  },
  
  updateButton: {
    ...shadows.sm,                       // Using your shadow tokens
  },
  
  designSystemButton: {
    ...shadows.md,                       // Using your medium shadow tokens
  },
  
  tokenShowcase: {
    padding: spacing.l,                  // 16px from your tokens
    backgroundColor: colors.background.secondary, // Using your secondary background
    borderRadius: borderRadius.s,        // 8px from your tokens
    borderWidth: borderWidth.xs,         // 1px from your tokens
    borderColor: colors.border.primary,  // Using your border color
    gap: spacing.s,                      // 8px from your tokens
  },
  
  showcaseTitle: {
    textAlign: 'center',
    color: colors.text.primary,          // Using your primary text color
  },
  
  showcaseDescription: {
    textAlign: 'center',
    lineHeight: typography.textS.lineHeight * 1.2, // Using your line height with slight adjustment
  },
});