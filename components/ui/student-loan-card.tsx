// components/ui/student-loan-card.tsx
import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from './text';
import { Button } from './button';
import { Card, CardContent, CardHeader } from './card';
import { 
  spacing, 
  borderRadius, 
  borderWidth,
  units,
  typography,
  fontFamily,
  fontWeight,
  shadows,
  colors
} from '~/lib/tokens';

interface StudentLoanCardProps {
  title: string;
  amount: string;
  dueDate: string;
  totalAmount?: string;
  asOfDate?: string;
  currentAmountDue?: string;
  paymentPending?: string;
  dueDateDetail?: string;
  isAutoDebitEnrolled?: boolean;
  onMakePayment?: () => void;
  onManageAutoDebit?: () => void;
  onViewDetails?: () => void;
}

export function StudentLoanCard({
  title,
  amount,
  dueDate,
  totalAmount,
  asOfDate,
  currentAmountDue,
  paymentPending,
  dueDateDetail,
  isAutoDebitEnrolled = false,
  onMakePayment,
  onManageAutoDebit,
  onViewDetails
}: StudentLoanCardProps) {
  return (
    <Card style={styles.card}>
      {/* Header Section */}
      <Pressable onPress={onViewDetails} style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant="textM" weight="medium" color="primary">
            {title}
          </Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </Pressable>

      <CardContent style={styles.content}>
        {/* Main Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.mainAmount}>{amount}</Text>
          <Text variant="textS" color="secondary" style={styles.dueDate}>
            Due on {dueDate}
          </Text>
        </View>

        {/* Account Info */}
        <View style={styles.accountInfo}>
          <Text variant="textS" color="secondary">{title}</Text>
          <Text variant="textS" color="tertiary">Jenny</Text>
        </View>

        {/* Auto Debit Section */}
        <Pressable onPress={onManageAutoDebit} style={styles.autoDebitSection}>
          <View style={styles.autoDebitIcon}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>💳</Text>
            </View>
          </View>
          <View style={styles.autoDebitContent}>
            <Text variant="textS" weight="medium" color="primary">
              Auto debit: {isAutoDebitEnrolled ? 'Enrolled' : 'Not enrolled'}
            </Text>
            <Text variant="textXS" color="secondary">
              Manage auto debit
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        {/* Make Payment Button */}
        <Button 
          style={styles.paymentButton}
          onPress={onMakePayment}
        >
          <Text variant="textM" weight="medium">Make a payment</Text>
        </Button>

        {/* Total Amount Section (if provided) */}
        {totalAmount && (
          <>
            <View style={styles.totalSection}>
              <Text style={styles.totalAmount}>{totalAmount}</Text>
              {asOfDate && (
                <Text variant="textS" color="secondary" style={styles.asOfDate}>
                  As of {asOfDate}
                </Text>
              )}
            </View>

            {/* Account Info Repeat */}
            <View style={styles.accountInfo}>
              <Text variant="textS" color="secondary">{title}</Text>
              <Text variant="textS" color="tertiary">Jenny</Text>
            </View>

            {/* Auto Debit Section Repeat */}
            <Pressable onPress={onManageAutoDebit} style={styles.autoDebitSection}>
              <View style={styles.autoDebitIcon}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>💳</Text>
                </View>
              </View>
              <View style={styles.autoDebitContent}>
                <Text variant="textS" weight="medium" color="primary">
                  Auto debit: {isAutoDebitEnrolled ? 'Enrolled' : 'Not enrolled'}
                </Text>
                <Text variant="textXS" color="secondary">
                  Manage auto debit
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>

            {/* Payment Details */}
            {(currentAmountDue || paymentPending || dueDateDetail) && (
              <View style={styles.paymentDetails}>
                {currentAmountDue && (
                  <View style={styles.detailRow}>
                    <Text variant="textS" color="secondary">Current Amount Due</Text>
                    <Text variant="textS" weight="medium" color="primary">{currentAmountDue}</Text>
                  </View>
                )}
                
                {paymentPending && (
                  <View style={styles.detailRow}>
                    <Text variant="textS" color="secondary">Payment Pending</Text>
                    <Text variant="textS" weight="medium" color="primary">{paymentPending}</Text>
                  </View>
                )}
                
                {dueDateDetail && (
                  <View style={styles.detailRow}>
                    <Text variant="textS" color="secondary">Due Date</Text>
                    <Text variant="textS" weight="medium" color="primary">{dueDateDetail}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Second Make Payment Button */}
            <Button 
              style={styles.paymentButton}
              onPress={onMakePayment}
            >
              <Text variant="textM" weight="medium">Make a payment</Text>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.s,           // 8px from your tokens
    marginHorizontal: spacing.l,         // 16px from your tokens
    borderRadius: borderRadius.l,        // 16px from your tokens
    ...shadows.md,                       // Medium shadow from your tokens
    overflow: 'hidden',
  },

  header: {
    backgroundColor: '#f8f9ff',          // Light purple background
    paddingHorizontal: spacing.l,        // 16px from your tokens
    paddingVertical: spacing.m,          // 12px from your tokens
    borderBottomWidth: borderWidth.xs,   // 1px from your tokens
    borderBottomColor: '#e8e9ff',
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  chevron: {
    fontSize: units[20],                 // 20px from your tokens
    color: colors.text.tertiary,         // Using your tertiary text color
    fontWeight: fontWeight.medium,       // Using your medium weight token
  },

  content: {
    padding: spacing.l,                  // 16px from your tokens
    gap: spacing.l,                      // 16px gap using your tokens
  },

  amountSection: {
    gap: spacing.xs,                     // 4px from your tokens
  },

  mainAmount: {
    fontSize: units[32],                 // 32px from your tokens
    fontFamily: fontFamily.rocGrotesk,   // Using your brand font
    fontWeight: fontWeight.bold,         // Using your bold weight token
    color: colors.text.primary,          // Using your primary text color
    lineHeight: units[40],               // 40px line height from your tokens
  },

  dueDate: {
    marginTop: spacing.xs,               // 4px from your tokens
  },

  totalAmount: {
    fontSize: units[28],                 // 28px from your tokens
    fontFamily: fontFamily.rocGrotesk,   // Using your brand font
    fontWeight: fontWeight.bold,         // Using your bold weight token
    color: colors.text.primary,          // Using your primary text color
    lineHeight: units[36],               // 36px line height from your tokens
  },

  totalSection: {
    gap: spacing.xs,                     // 4px from your tokens
    marginTop: spacing.xl,               // 24px from your tokens
  },

  asOfDate: {
    marginTop: spacing.xs,               // 4px from your tokens
  },

  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,         // 4px from your tokens
  },

  autoDebitSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary, // Using your secondary background
    borderRadius: borderRadius.s,        // 8px from your tokens
    padding: spacing.m,                  // 12px from your tokens
    gap: spacing.m,                      // 12px from your tokens
  },

  autoDebitIcon: {
    width: units[40],                    // 40px from your tokens
    height: units[40],                   // 40px from your tokens
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconCircle: {
    width: units[32],                    // 32px from your tokens
    height: units[32],                   // 32px from your tokens
    borderRadius: borderRadius.circle,   // 50px from your tokens (circle)
    backgroundColor: '#2563eb',          // Blue background
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    fontSize: units[16],                 // 16px from your tokens
  },

  autoDebitContent: {
    flex: 1,
    gap: spacing.xs,                     // 4px from your tokens
  },

  paymentButton: {
    backgroundColor: '#2563eb',          // Blue color matching the design
    borderRadius: borderRadius.l,        // 16px from your tokens (larger radius for buttons)
    paddingVertical: spacing.l,          // 16px from your tokens
    marginTop: spacing.s,                // 8px from your tokens
    ...shadows.sm,                       // Small shadow from your tokens
  },

  paymentDetails: {
    gap: spacing.m,                      // 12px from your tokens
    backgroundColor: colors.background.secondary, // Using your secondary background
    borderRadius: borderRadius.s,        // 8px from your tokens
    padding: spacing.l,                  // 16px from your tokens
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export type { StudentLoanCardProps };